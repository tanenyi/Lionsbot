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
            signupToFirebase();
        }
        serial = getParameter("id");
        if (serial != null)
        {
            termsNconditions(serial);
        }
    }
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
function signupToFirebase()
{
    var jumbo = $("<div>",
        {
            class: "jumbotron text-center seethrough"
        });
    var logo = $("<img>",
        {
            src: "finallogo.png",
            class: "rounded mx-auto"
        });
    var spacer = "<br><br>";
    var spacer2 = "<br>";
    var widget = $("<div>",
        {
            id: "loginWidget"
        });

    var content = jumbo.append([spacer, logo, spacer2, widget]);

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
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
        class: "jumbotron text-center seethrough"
    });
    var logo = $("<img>",
        {
            src: "finallogo.png",
            class: "rounded mx-auto"
        });
    var spacer = "<br><br>";
    var spacerbtn = "<br>";
    var title = $("<h2>").html("Terms & Conditions");
    var selectionRow = $("<div>",
        {
            class: "row justify-content-center policybox p-3 ml-4 mr-4"
        }).html("Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum hellooo thiiis issssssss teeeeeeeeeext to fill the space thanks and also this is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
    var horizontalSpacer = "&emsp;&emsp;&emsp;";
    var explain = $("<h6>").html("(You'll have to agree in order to use our bots!)");
    var disagreeButton = $("<button>",
        {
            type: "button",
            class: "btn btn-primary waves-effect btnpolicyno"
        }).html("I Do Not Agree");
    var agreeButton = $("<button>",
        {
            type: "button",
            class: "btn btn-primary waves-effect btnpolicyyes"
        }).html("I Agree");
    var form = $("<div>",
        {
            class: "col-4 offset-4"
        });
    var group = $("<div>",
        {
            class: "form-group"
        });
    var keyLabel = $("<label>").html("Authetication Key<br>From Robot");
    var keyInput = $("<input>",
        {
            id: "key",
            type: "text",
            class: "form-control text-center",
            placeholder: "XXXX"
        });

    disagreeButton.click(function()
        {
            window.location.replace("https://lionsbot.com");
        });
    agreeButton.click(function()
        {
            var data = firebase.database().ref("robots").orderByKey().equalTo(String(parseInt(serial)))
            data.on("child_added", function(word)
            {
                if ($("#key").val() == word.child("key").val())
                {
                    showLoading();
                    showRobot(serial);
                }
                else
                {
                    $("#key").val("");
                    alert("Wrong key");
                }
            });

        });

    form.append([group.append([keyLabel, keyInput])])

    // var row = selectionRow.append([]);
    var content = jumbo.append([logo, spacer, title, selectionRow, spacerbtn, explain, spacerbtn, form, spacerbtn, disagreeButton, horizontalSpacer, agreeButton]);

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
            class: "card-header waves-effect waves-light boxed"
        });
    var interactTitle = $("<h4>");
    var interactContent = $("<div>",
        {
            id: "questions",
            class: "card-body textwall"
        });

    interactHeader.click(function()
        {
            selection(0);
        });

    interactTitle.append("Interact");
    interactTitle.append("&emsp;&emsp;");
    interactTitle.append("<img src='interact.png'></img>");

    return interactCard.append([interactHeader.append(interactTitle), interactContent]);
}

function createSuggestForm()
{
    var form = $("<div>");
    var group = $("<div>",
        {
            class: "form-group text-left"
        });
    var nameLabel = $("<label>").text("Name");
    var nameInput = $("<input>",
        {
            id: "name",
            type: "text",
            class: "form-control",
            placeholder: "John Doe"
        });
    var typeLabel = $("<label>").text("Suggestion Type / Report");
    var typeInput = $("<select>",
        {
            id: "type",
            class: "form-control"
        });
    var textLabel = $("<label>").text("Description");
    var textInput = $("<textarea>",
        {
            id: "text",
            class: "form-control",
            rows: "3"
        });
    var spacer = "<br>"
    var button = $("<button>",
        {
            class: "btn btn-success waves-effect"
        }).text("Submit");

    var options = ["Suggest questions", "Suggest answer", "Suggest song", "Suggest other ideas", "Report error"];

    for (var i = 0; i < options.length; i++)
    {
        typeInput.append("<option>" + options[i] + "</option>");
    }

    button.click(function()
        {
            firebase.database().ref('/suggestions').push({
                name: $("#name").val(),
                email: firebase.auth().currentUser.email,
                type: $("#type").val(),
                text: $("#text").val(),
            });

            $("#name").val("");
            $("#type").val("");
            $("#text").val("");

            selection(1);
        });

    let formContent = [nameLabel, nameInput, spacer, typeLabel, typeInput, spacer, textLabel, textInput];

    return [form.append([group.append(formContent)]), button];
}

function createSuggestCard()
{
    var suggestCard = $("<div>",
        {
            class: "card"
        });
    var suggestHeader = $("<div>",
        {
            class: "card-header waves-effect waves-light boxed"
        });
    var suggestTitle = $("<h4>");
    var suggestContent = $("<div>",
        {
            class: "card-body textwall"
        });

    suggestHeader.click(function()
        {
            selection(1);
        });

    suggestTitle.append("Suggest");
    suggestTitle.append("&emsp;&emsp;");
    suggestTitle.append("<img src='suggest.png'></img>");

    return suggestCard.append([suggestHeader.append(suggestTitle), suggestContent.append(createSuggestForm())]);
}

function createAboutCard()
{
    var aboutCard = $("<div>",
        {
            class: "card"
        });
    var aboutHeader = $("<div>",
        {
            class: "card-header waves-effect waves-light boxed"
        });
    var aboutTitle = $("<h4>");
    var aboutContent = $("<div>",
        {
            class: "card-body textwall"
        });

    aboutHeader.click(function()
        {
            selection(2);
        });

    aboutTitle.append("About");
    aboutTitle.append("&emsp;&emsp;");
    aboutTitle.append("<img src='about.png'></img>");

    aboutContent.append("Made on 27th September 2018");
    aboutContent.append("<br><br>");
    aboutContent.append("Courtesy of Lionsbot");
    aboutContent.append("<br><br>");
    aboutContent.append("Find out more on our website!");
    aboutContent.append("<br><br>");
    aboutContent.append("<a href='https://lionsbot.com'><i class='fas fa-globe-americas fa-4x'></i></a>");

    return aboutCard.append([aboutHeader.append(aboutTitle), aboutContent]);
}

function fillQuestions()
{
    firebase.database().ref().child("questions").on('child_added', snap => {
        var num = $("<div>",
            {
                class: "col-3"
            }).append($("<p>", { class: "my-auto" }).text(snap.child("question_id").val()));
        var question = $("<div>",
            {
                class: "col-9"
            }).append($("<p>", { class: "my-auto" }).text(snap.child("name").val()));
        var row = $("<div>",
            {
                class: "row text-center bottom-border waves-effect"
            }).append([num, question]);

        row.click(function()
            {
            firebase.database().ref('/robots/'+parseInt(serial)).update(
                {
                    IsFree: false,
                    selected_QuesID:snap.child("question_id").val()
                });
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

        var content = $("<div>");
        content.append("<br>");
        content.append($("<h4>", { class: "text-center" }).append(robotName));
        content.append("<br>");
        content.append($("<p>", { class: "text-center" }).append(word.child("type").val()));
        content.append("<br>");
        content.append($("<p>", { class: "text-center" }).append(word.child("character").val()));

        $("#robotName").append($("<h3>").text(robotName));
        $("#intro").append(content);
    });
}

function fillMainContent()
{
    var top = $("<div>",
        {
            class: "col-12"
        });
    var pic = $("<div>",
        {
            id: "pic",
            class: ""
            src: "finallogo.png"
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
            class: "card-img-top mx-auto  waves-effect waves-light",
            src: "ironman.gif",
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

    rightContent.append("<a href='https://lionsbot.com'><img src=newtwitter.png></img></a>");
    rightContent.append("<br><br>");
    rightContent.append("<a href='https://lionsbot.com'><img src=bestfb.png class=test></img></a>");
    rightContent.append("<br><br>");;
    rightContent.append("<a href='https://lionsbot.com'><img src=web.png class=social></img></a>");

    $("#mainContent").append([top.append(pic), left, center.append(photo), right.append(rightContent)]);
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
            class: "row seethrough align-items-center"
        });
    var accordion = $("<div>",
        {
            class: "accordion col-10 offset-1"
        });

    accordion.append([createInteractCard(), "<br>", createSuggestCard(), "<br>", createAboutCard()]);

    $("body").html(content.append([mainContent, "<br>", accordion]));
    $(".textwall").hide();

    fillQuestions();
    fillMainContent();
    showModal();
    fillIntro();
}

function showModal()
{
    var modal = $("<div>",
        {
            id: "modal",
            class: "modal fade waves-effect",
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
        });

    body.append("Model number");
    body.append("<br>");
    body.append("Dimensions (product): 735(L) x 630(W) x 1100(H)");
    body.append("<br>");
    body.append("Scrubbing width&emsp;: 450mm (2x 9 inch)");
    body.append("<br>");
    body.append("Brush Pressure&emsp;: 50Kg, 63 g/cm2");
    body.append("<br>");
    body.append("Solution Tank&emsp;: 35L");
    body.append("<br>");
    body.append("Recovery Tank&emsp;: 35L");
    body.append("<br>");
    body.append("Z water Cartridge&emsp;: 2L");
    body.append("<br>");
    body.append("Noise Level&emsp;: 59dB /cm2");
    body.append("<br>");
    body.append("Max cleaning coverage&emsp;: 1600m2/hr");
    body.append("<br>");
    body.append("Turning radius&emsp;&emsp;: 870mm full turn");
    body.append("<br>");
    body.append("Cleaning speed&emsp;: 0.5 - 1m/s");
    body.append("<br>");
    body.append("Movement speed&emsp;: 0.2 - 2m/s");
    body.append("<br>");
    body.append("Battery Specs&emsp;: 24V 120Ah LiFePO4");
    body.append("<br>");
    body.append("Time to full charge&emsp;: 2 Hrs");
    body.append("<br>");
    body.append("Running time&emsp;: 3 Hrs");
    body.append("<br>");
    body.append("Weight of machine (max): 220Kg");
    body.append("<br>");
    body.append("Connectivity: 3G / 4G, Wifi");;

    var content = modal.append(dialog.append(content.append(header).append(body)));

    $("body").append(content);
}
