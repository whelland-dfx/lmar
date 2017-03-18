

//=========================================================
// Setup All dependancies
//=========================================================

require('dotenv-extended').load();

var restify = require('restify');
var builder = require('botbuilder');


//=========================================================
// Setup Restify Server
//=========================================================

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  

//=========================================================
// Create Chat Connector
//=========================================================

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


//=========================================================
// Setup the bot object
//=========================================================

var bot = new builder.UniversalBot(connector);

//=========================================================
// Bot Set the intent object
//=========================================================

var intents = new builder.IntentDialog();


//=========================================================
// Driver/Main
//=========================================================

var bot = new builder.UniversalBot(connector, [
    function (session) {
    	session.beginDialog('/banner');
        session.beginDialog('/rootMenu');
    },
    function (session, results) {
        session.endConversation("Goodbye until next time...");
    }

]);


//=========================================================
// Bot Dialogs
//=========================================================

bot.dialog('/rootMenu', [
    function (session) {
        builder.Prompts.choice(session, "Choose an option:", 'Our Services|See our product lines|Make a Booking|Change a Booking|Check your upcomgin appointment|Quit');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/chooseServiceDialog');
                break;
            case 1:
                session.beginDialog('/seeOurProductsDialog');
                break;
            case 2:
                session.beginDialog('/makeABookingDialog');
                break;
            case 3:
                session.beginDialog('/changeBookingDialog');
                break;
            case 4:
                session.beginDialog('/checkYourBookingDialog');
                break;
            default:
                session.endDialog();
                break;
        }
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]).reloadAction('showMenu', null, { matches: /^(menu|back|start)/i });

bot.dialog('/banner', [
    function (session, args) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("Hello welcome to Hairhaus - London Ontario")
            .images([
                 builder.CardImage.create(session, "http://hairhaus.ca/images/hair-haus-logo-white.jpg")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
    }
]);

bot.dialog('/done', [
    function (session, args) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("Hairhaus - London Ontario")
            .images([
                 builder.CardImage.create(session, "http://hairhaus.ca/images/hair-haus-logo-white.jpg")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.beginDialog('/products');
    }
]);


bot.dialog('/seeOurProductsDialog', [
	function (session, args) {

		var cards = getCardsAttachments();

    // create reply with Carousel AttachmentLayout
    var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);

    session.send(reply);
	}

]);


bot.dialog('/chooseServiceDialog', [
	function (session, args) {

        builder.Prompts.choice(session, "Hello... Welcome to Hairhaus!  How can we help you today?", [
        	 "Cut and style", 
            "Blow out and style",
            "Formal Style",
            "Colour",
            "Highligts & Lowlights",
            "Manicure & Pedicure",
            "Facials & Massage",
            "Beauty",
            "Waxing",
            "Tint"
        	]);
	}

]);


bot.dialog('/makeABookingDialog', [
	function (session, args) {

        builder.Prompts.choice(session, "makeABookingDialog", [
            "This week",
            "Next week",
            "More times for you to choose from"
        	]);
	},
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/bookThisWeek');
                break;
            case 1:
                session.beginDialog('/bookNextWeek');
                break;
            case 2:
                session.beginDialog('/bookLater');
                break;
            default:
                session.endDialog();
                break;
        }
    }

]);

bot.dialog('/checkBookingDialog', [
	function (session, args) {

        builder.Prompts.choice(session, "checkBookingDialog", [
            "This week",
            "Next week",
            "More times for you to choose from"
        	]);
	},
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/bookThisWeek');
                break;
            case 1:
                session.beginDialog('/bookNextWeek');
                break;
            case 2:
                session.beginDialog('/bookLater');
                break;
            default:
                session.endDialog();
                break;
        }
    }

]);

bot.dialog('/checkYourBookingDialog', [
	function (session, args) {

        builder.Prompts.choice(session, "checkYourBookingDialog", [
            "This week",
            "Next week",
            "More times for you to choose from"
        	]);
	},
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/bookThisWeek');
                break;
            case 1:
                session.beginDialog('/bookNextWeek');
                break;
            case 2:
                session.beginDialog('/bookLater');
                break;
            default:
                session.endDialog();
                break;
        }
    }

]);


//bookThisWeek')
//('/bookNextWeek');
//'/bookLater');


bot.dialog('rollDiceDialog', [
    function (session, args) {
        builder.Prompts.number(session, "How many dice should I roll?");
    },
    function (session, results) {
        if (results.response > 0) {
            var msg = "I rolled:";
            for (var i = 0; i < results.response; i++) {
                var roll = Math.floor(Math.random() * 6) + 1;
                msg += ' ' + roll.toString(); 
            }
            session.endDialog(msg);
        } else {
            session.endDialog("Ummm... Ok... I rolled air.");
        }
    }
]);

// Magic 8-Ball
bot.dialog('magicBallDialog', [
    function (session, args) {
        builder.Prompts.text(session, "What is your question?");
    },
    function (session, results) {
        // Use the SDK's built-in ability to pick a response at random.
        session.endDialog(magicAnswers);
    }
]);



//=========================================================
// Functions and Vars
//=========================================================

function getCardsAttachments(session) {
    return [


        new builder.HeroCard(session)
            .title('JAYDANCIN')
            //.subtitle('Process events with a serverless code architecture')
            .text('We are very excited to announce that we are now carrying Jaydancin products. They are ALL natural and organic , no preservatives or parabens. After A long search for products we really believe in, we finally found it.')
            .images([
                builder.CardImage.create(session, 'http://hairhaus.ca/images/jandancin.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://hairhaus.ca/', 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title('GOLDWELL')
            //.subtitle('Process events with a serverless code architecture')
            .text('For over 60 years Goldwell has been established as an exclusive luxury line to professional hairstylists. We are proud to partner with Goldwell and deliver optimal results to our guests.')
            .images([
                builder.CardImage.create(session, 'http://hairhaus.ca/images/promotion-goldwell.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://hairhaus.ca/', 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title('LAYRITE')
            //.subtitle('Process events with a serverless code architecture')
            .text('Layrite strives to represent a culture and brand that puts a modern style on a classic look. The masculine, vintage products they produce allow our customers to maintain this style while also adding their own originality to their overall image.')
            .images([
                builder.CardImage.create(session, 'http://hairhaus.ca/images/promo-layrite.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://hairhaus.ca/', 'Learn More')
            ]),

        new builder.HeroCard(session)
            .title('FROM LONDON!')
            //.subtitle('Process events with a serverless code architecture')
            .text('Jaydancin offers a line of products that are created from the heart and human spirit, inspired from real people who have serious illnesses such as Cancer to people who simply want pure, clean products without chemicals.')
            .images([
                builder.CardImage.create(session, 'http://hairhaus.ca/images/promotion1.png')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://hairhaus.ca/', 'Learn More')
            ]),

    ];
}



var magicAnswers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];


//=========================================================
// Wiring
//=========================================================

server.post('/api/messages', connector.listen());