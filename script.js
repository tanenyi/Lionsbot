var app;
var serial;

$(
    function()
    {
        autostart();
        serial = getParameter("robot");
        if (serial != null)
        {
            signup(serial);
            // setupParse();
            // tnc(serial);
        }
        serial = getParameter("id");
        if (serial != null)
        {
            setupParse();
            tnc(serial);
        }
    }
    //i dunno
);

function autostart()
{
    var config = {
        apiKey: "AIzaSyCSerWL0hXej5S9BWInzHwhl-ZxzKCpkLw",
        authDomain: "leobotmingle.firebaseapp.com",
        databaseURL: "https://leobotmingle.firebaseio.com",
        projectId: "leobotmingle",
        storageBucket: "leobotmingle.appspot.com",
        messagingSenderId: "846540641628"
    };
    firebase.initializeApp(config);
}

function signup(serial)
{

    var uiConfig = {
        signInSuccessUrl: "?id=" + serial,
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: "https://lionsbot.com",
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
            window.location.assign("https://lionsbot.com");
        }
    };
    var jumbo = $("<div>",
    {
        class: "jumbotron text-center"
    }).append(
        $("<img>",
        {
            src: "lionsbot.jpg",
            class: "rounded mx-auto"
        })
    ).append(
        "<br><br><br>"
    ).append(
        $("<h2>").html("Signup")
    ).append(
        "<br><br><br>"
    ).append(
        $("<div>",
        {
            id: "firebaseLogin"
        })
    )
    $("body").html(jumbo);
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseLogin', uiConfig);
}

function tnc(serial)
{
    var jumbo = $("<div>",
    {
        class: "jumbotron text-center"
    }).append(
        $("<img>",
        {
            src: "lionsbot.jpg",
            class: "rounded mx-auto"
        })
    ).append(
        "<br><br><br>"
    ).append(
        $("<h2>").html("Terms & Conditions")
    ).append(
        "<br><br><br>"
    ).append(
        $("<p>").html("You agree to the following...")
    ).append(
        "<br><br><br>"
    ).append(
        $("<button>",
        {
            type: "button",
            class: "btn btn-danger"
        }).html("I Do Not Agree").click(function()
        {
            window.location.replace("https://lionsbot.com");
        })
    ).append("&emsp;&emsp;&emsp;").append(
        $("<button>",
        {
            type: "button",
            class: "btn btn-primary"
        }).html("I Agree").click(function()
        {
            // var email = $("#email").val();
            // if (serial == null || email == "")
            // {
            // }
            // else
            // {
            //     const Signup = Parse.Object.extend("Signup");
            //     const signup = new Signup();
            //     signup.set("email", email);
            //     signup.save();
            // }
            showLoading();
            getRobot(serial);
        })
    )
    $("body").html(jumbo);
}

function showLoading()
{
    var content = $("<div>",
    {
        class: "text-center"
    }).html("Please wait...");
    $("body").html(content);
}

function getParameter(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setupParse()
{
    Parse.initialize("HNkVZTcZ4U0tuvAuONfVTb4kwmx5fLQEcFu3myCW", "LSELD53NxQqYeFfU0E1OFkfZpmpBCu8UiNZBiXer");
    Parse.serverURL = "https://parseapi.back4app.com/";
}

async function getRobots()
{
    const robots = Parse.Object.extend("Robot");
    const query = new Parse.Query(robots);
    const results = await query.find();
    fillTable(results);
}

async function getRobot(serial)
{
    const robots = Parse.Object.extend("Robot");
    const query = new Parse.Query(robots);
    query.equalTo("serial", serial)
    const results = await query.find();
    showRobot(results[0]);
}

function prettifyStatus(status)
{
    if (status == "Ready")
    {
        return "<span class='badge badge-success'>" + status + "</span>";
    }
    else if (status == "In Operation")
    {
        return "<span class='badge badge-primary'>" + status + "</span>";
    }
    else if (status == "Charging")
    {
        return "<span class='badge badge-warning'>" + status + "</span>";
    }
    else if (status == "Under Repairs")
    {
        return "<span class='badge badge-danger'>" + status + "</span>";
    }
    else
    {
        return "<span class='badge'>" + status + "</span>";
    }
}

function selection(number)
{
    var mainShow = true;
    $(".textwall").each(function(index)
    {
        if (index == number)
        {

            if ($(this).is(":visible") == true)
            {
                $(this).slideUp("fast", function()
                {
                    $("#mainContent").slideDown("fast");
                });
            }
            else
            {
                mainShow = false;
                $(this).slideDown("fast");
            }

            // $("html, body").animate(
            // {
            //     'scrollTop':   $(this).offset().top
            // }, 1000);
        }
        else
        {
            $(this).slideUp("fast");
        }
    });
    if (mainShow == false)
    {
        $("#mainContent").slideUp("fast");
    }
}

function fillTable(results)
{
    function createColumns(titles)
    {
        var columns = [];
        for (var i = 0; i < titles.length; i++)
        {
            columns.push($("<div>",
            {
                class: "col border"
            }).html(titles[i]));
        }
        return columns
    }
    var table = $("<div>",
    {
        class: "container text-center align-middle"
    });
    var header = $("<div>",
    {
        class: "row bg-primary text-white"
    });
    header.html(createColumns(["Name", "Location", "Serial", "Status"]));
    table.html(header);
    for (var i = 0; i < results.length; i++)
    {
        var name = results[i].get("name");
        var location = results[i].get("location");
        var serial = results[i].get("serial");
        var status = prettifyStatus(results[i].get("status"));
        name = "<a href='?id=" + serial + "'>" + name + "</a>"
        var row = $("<div>",
        {
            class: "row"
        });
        row.html(createColumns([name, location, serial, status]));
        table.append(row);
    }
    $("body").html(table);
}

function showRobot(robot)
{
    var content = $("<div>",
    {
        class: "text-center"
    });
    content.append(
        $("<div>",
        {
            id: "mainContent",
            class: "card"
        })
    );
    content.append(
        $("<div>",
        {
            class: "accordion"
        }).append(
            $("<div>",
            {
                class: "card"
            }).append(
                $("<div>",
                {
                    class: "card-header"
                }).append(
                    $("<h4>").html("Interact" + "&emsp;&emsp;<i class='fas fa-hand-point-up'></i>")
                ).click(function()
                {
                    selection(0);
                })
            ).append(
                $("<div>",
                {
                    id: "questions",
                    class: "card-body textwall"
                })
            )
        ).append(
            $("<div>",
            {
                class: "card"
            }).append(
                $("<div>",
                {
                    class: "card-header"
                }).append(
                    $("<h4>").html("Suggest" + "&emsp;&emsp;<i class='far fa-comment'></i>")
                ).click(function()
                {
                    selection(1);
                })
            ).append(
                $("<div>",
                {
                    class: "card-body textwall"
                }).append(
                    $("<img>",
                    {
                        src: robot.get("map").url()
                    })
                )
            )
        ).append(
            $("<div>",
            {
                class: "card"
            }).append(
                $("<div>",
                {
                    class: "card-header"
                }).append(
                    $("<h4>").html("About" + "&emsp;&emsp;<i class='fas fa-info-circle'></i>")
                ).click(function()
                {
                    selection(3);
                })
            ).append(
                $("<div>",
                {
                    class: "card-body textwall"
                }).html("Made on 27th September 2018\nCourtesy of Lionsbot\n\nFind out more on our website!")
            )
        )
    )
    $("body").html(content);
    var alternate = false
    firebase.database().ref().child("questions").on('child_added', snap => {
        var num = $("<div>",
            {
                class: "col-3"
            }).append($("<p>").text(snap.child("question_id").val()));

        var question = $("<div>",
            {
                class: "col-9"
            }).append($("<p>").text(snap.child("name").val()));

        var row = $("<div>",
            {
                class: "row text-center"
            }).append(num).append(question);

        row.click(function()
        {
            var data = {IsFree: false, selected_QuesID:snap.child("question_id").val()}
            var updates = {};
            updates['/robots/'+parseInt(serial)] = data;
            firebase.database().ref().update(updates);
        });

        $("#questions").append(row);

    });

    $("#mainContent").append($("<div>",
    {
        class: "row align-items-center"
    }).append($("<div>",
        {
            id: "intro",
            class: "col-3 text-center"
        })
    ).append($("<div>",
        {
            class: "col-6"
        }).append($("<img>",
            {
                class: "card-img-top mx-auto",
                src: "rotating.gif"//robot.get("image").url()
            }).click(function()
                {
                    $("#modal").modal("toggle");
                }))
    ).append($("<div>",
        {
            class: "col-3"
        }).append($("<div>",
            {
                class: "row socialIcons"
            }).html("<i class='fab fa-facebook fa-4x'></i><br><i class='fab fa-twitter fa-4x'></i><br><i class='fas fa-share-square fa-4x'></i>"))
        )
    );
    $(".textwall").hide();

    var robotName;

    var data = firebase.database().ref("robots").orderByKey().equalTo(String(parseInt(serial)))
    data.on("child_added", function(word)
    {
        robotName = word.child("name").val();
        var name = $("<div>",
            {
                class: "row"
            }).append($("<h3>").text(robotName));

        $("#robotName").append($("<h3>").text(robotName));

        var type = $("<div>",
            {
                class: "row"
            }).append($("<p>").text(word.child("type").val()));

        var character = $("<div>",
            {
                class: "row"
            }).append($("<p>").text(word.child("character").val()));

        var col = $("<div>",
            {
                class: "col"
            }).append(name).append(type).append(character);


        $("#intro").append(col);
    });

    var modal = $("<div>",
        {
            id: "modal",
            class: "modal fade",
            tabindex: "-1",
            role: "dialog",
            ariaLabelledby: "exampleModalLabel",
            ariaHidden: "true"
        });

    var dialog = $("<div>",
        {
            class: "modal-dialog",
            role: "document"
        });
    //hello

    var content = $("<div>",
        {
            class: "modal-content"
        });

    var header = $("<div>",
        {
            id: "robotName",
            class: "modal-header text-center"
        });

    var body = $("<div>",
        {
            class: "modal-body"
        }).html("Model number<br>Dimensions (product): 735(L) x 630(W) x 1100(H)<br>Scrubbing width	: 450mm (2x 9 inch)<br>Brush Pressure	: 50Kg, 63 g/cm2<br>Solution Tank	: 35L<br>Recovery Tank	: 35L<br>Z water Cartridge	: 2L<br>Noise Level	: 59dB /cm2<br>Max cleaning coverage	: 1600m2/hr<br>Turning radius		: 870mm full turn<br>Cleaning speed	: 0.5 - 1m/s<br>Movement speed	: 0.2 - 2m/s<br>Battery Specs	: 24V 120Ah LiFePO4<br>Time to full charge	: 2 Hrs<br>Running time	: 3 Hrs<br>Weight of machine (max): 220Kg<br>Connectivity: 3G / 4G, Wif");

    var total = modal.append(dialog.append(content.append(header).append(body)));

    $("body").append(total);
    // ).append(
    //     $("<div>",
    //     {
    //         class: "card-body"
    //     }).append(
    //         $("<h3>",
    //         {
    //             class: "card-title"
    //         }).html(robot.get("name"))
    //     ).append(
    //         $("<p>",
    //         {
    //             class: "card-text"
    //         }).html(prettifyStatus(robot.get("status")))
    //     ).append(
    //         $("<p>",
    //         {
    //             class: "card-text"
    //         }).html(robot.get("model") + " (SN: " + robot.get("serial") + ")")
    //     ).append(
    //         $("<p>",
    //         {
    //             class: "card-text text-secondary"
    //         }).html("@ " + robot.get("location"))
    //     )
    // )
}
