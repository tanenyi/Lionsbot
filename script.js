var serial;

// this chunk always runs when the window loads
// $(function() {}) is a jQuery shorthand for $(document).ready()
$(
    function()
    {
        setupFirebaseConnection();
        serial = getParameter("robot");
        if (serial != null)
        {
            signupToFirebase(serial);
            // setupParse();
            // termsNconditions(serial);
        }
        serial = getParameter("id");
        if (serial != null)
        {
            termsNconditions(serial);
        }
    }
    //i dunno
);

// connects the browsing session to the database for retrieval and submission
function setupFirebaseConnection()
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

// autheticates the user so they can access the full webpage
function signupToFirebase(serial)
{
    var jumbo = $("<div>",
        {
            class: "jumbotron text-center"
        });
    var logo = $("<img>",
        {
            src: "lionsbot.jpg",
            class: "rounded mx-auto"
        });
    var spacer = "<br><br><br>";
    var title = $("<h2>").html("Signup");
    var widget = $("<div>",
        {
            id: "loginWidget"
        });

    var content = jumbo.append([logo, spacer, title, spacer, widget]);

    $("body").html(jumbo);
    createLoginWidget()
}

function createLoginWidget()
{
    var uiConfig =
    {
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
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#loginWidget', uiConfig);
}

// show the terms and conditions and if accepted, display all the robot information
function termsNconditions(serial)
{
    var jumbo = $("<div>",
    {
        class: "jumbotron text-center"
    });
    var logo = $("<img>",
        {
            src: "lionsbot.jpg",
            class: "rounded mx-auto"
        });
    var spacer = "<br><br><br>";
    var title = $("<h2>").html("Terms & Conditions");
    var textwall = $("<p>").html("You agree to the following...");
    var selectionRow = $("<div>",
        {
            class: "row justify-content-center"
        });
    var horizontalSpacer = "&emsp;&emsp;&emsp;";
    var disagreeButton = $("<button>",
        {
            type: "button",
            class: "btn btn-danger"
        }).html("I Do Not Agree");
    var agreeButton = $("<button>",
        {
            type: "button",
            class: "btn btn-primary"
        }).html("I Agree");

    disagreeButton.click(function()
        {
            window.location.replace("https://lionsbot.com");
        });
    agreeButton.click(function()
        {
            showLoading();
            showRobot(serial);
        });

    var row = selectionRow.append([disagreeButton, horizontalSpacer, agreeButton]);
    var content = jumbo.append([logo, spacer, title, spacer, textwall, spacer, row]);

    $("body").html(content);
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

function selection(number)
{
    var showMainContent = true;
    $(".textwall").each(function(index)
    {
        if (index == number)
        {
            if ($(this).is(":visible") == true)
            {
                $(this).slideUp("fast", function()
                { $("#mainContent").slideDown("fast"); });
            }
            else
            {
                showMainContent = false;
                $(this).slideDown("fast");
            }
        }
        else
        { $(this).slideUp("fast"); }
    });
    if (showMainContent == false)
    { $("#mainContent").slideUp("fast"); }
}

function createInteractCard()
{
    var interactCard = $("<div>",
        {
            class: "card"
        });
    var interactHeader = $("<div>",
        {
            class: "card-header"
        });
    var interactTitle = $("<h4>").html("Interact" + "&emsp;&emsp;<i class='fas fa-hand-point-up'></i>");
    var interactContent = $("<div>",
        {
            id: "questions",
            class: "card-body textwall"
        });

    interactHeader.click(function()
        {
            selection(0);
        });

    return interactCard.append([interactHeader.append(interactTitle), interactContent]);
}

function createSuggestCard()
{
    var suggestCard = $("<div>",
        {
            class: "card"
        });
    var suggestHeader = $("<div>",
        {
            class: "card-header"
        });
    var suggestTitle = $("<h4>").html("Suggest" + "&emsp;&emsp;<i class='far fa-comment'></i>");
    // TODO: need to make a bootstrap form here
    var suggestContent = $("<div>",
        {
            id: "suggestions",
            class: "card-body textwall"
        });

    suggestHeader.click(function()
        {
            selection(1);
        });

    return suggestCard.append([suggestHeader.append(suggestTitle), suggestContent]);
}

function createAboutCard()
{
    var aboutCard = $("<div>",
        {
            class: "card"
        });
    var aboutHeader = $("<div>",
        {
            class: "card-header"
        });
    var aboutTitle = $("<h4>").html("About" + "&emsp;&emsp;<i class='fas fa-info-circle'></i>");
    var aboutContent = $("<div>",
        {
            class: "card-body textwall"
        }).html("Made on 27th September 2018\nCourtesy of Lionsbot\n\nFind out more on our website!");

    aboutHeader.click(function()
        {
            selection(2);
        });

    return aboutCard.append([aboutHeader.append(aboutTitle), aboutContent]);
}

function fillQuestions()
{
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
}

function fillIntro()
{
    var data = firebase.database().ref("robots").orderByKey().equalTo(String(parseInt(serial)))
    data.on("child_added", function(word)
    {
        robotName = word.child("name").val();
        var name = $("<div>",
            {
                class: "row"
            }).append($("<h3>").text(robotName));
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

        $("#robotName").append($("<h3>").text(robotName));
        $("#intro").append(col);
    });
}

function fillMainContent()
{
    var row = $("<div>",
        {
            class: "row align-items-center"
        });
    var left = $("<div>",
        {
            id: "intro",
            class: "col-3 text-center"
        });
    var center = $("<div>",
        {
            class: "col-6"
        });
    var photo = $("<img>",
        {
            class: "card-img-top mx-auto",
            src: "rotating.gif"//robot.get("image").url()
        });
    var right = $("<div>",
        {
            class: "col-3"
        });
    var rightContent = $("<div>",
            {
                class: "row socialIcons"
            });

    photo.click(function()
        {
            $("#modal").modal("toggle");
        });

    rightContent.html("<i class='fab fa-facebook fa-4x'></i><br><i class='fab fa-twitter fa-4x'></i><br><i class='fas fa-share-square fa-4x'></i>");

    $("#mainContent").append(row.append([left, center.append(photo), right.append(rightContent)]));
}

function showRobot(robot)
{
    var content = $("<div>",
        {
            class: "text-center"
        });
    var mainContent = $("<div>",
        {
            id: "mainContent",
            class: "card"
        });
    var accordion = $("<div>",
        {
            class: "accordion"
        });

    var selection = accordion.append([createInteractCard(), createSuggestCard(), createAboutCard()]);

    $("body").html(content.append([mainContent, selection]));
    $(".textwall").hide();

    fillQuestions();
    fillIntro();
    fillMainContent();
    showModal();
}

function showModal()
{
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
        }).html("Model number<br>Dimensions (product): 735(L) x 630(W) x 1100(H)<br>Scrubbing width	: 450mm (2x 9 inch)<br>Brush Pressure	: 50Kg, 63 g/cm2<br>Solution Tank	: 35L<br>Recovery Tank	: 35L<br>Z water Cartridge	: 2L<br>Noise Level	: 59dB /cm2<br>Max cleaning coverage	: 1600m2/hr<br>Turning radius		: 870mm full turn<br>Cleaning speed	: 0.5 - 1m/s<br>Movement speed	: 0.2 - 2m/s<br>Battery Specs	: 24V 120Ah LiFePO4<br>Time to full charge	: 2 Hrs<br>Running time	: 3 Hrs<br>Weight of machine (max): 220Kg<br>Connectivity: 3G / 4G, Wifi");

    var content = modal.append(dialog.append(content.append(header).append(body)));

    $("body").append(content);
}
