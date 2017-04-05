
//=========================================================
// Setup All dependancies
//=========================================================

require('dotenv-extended').load();

var restify = require('restify');
var builder = require('botbuilder');
var mongoose = require('mongoose');

//=========================================================
// Setup our Mongoose connection
//=========================================================
/*mongoose.connect('mongodb://localhost/db_hairhaus');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
*/

//=========================================================
// Setup Restify Server
//=========================================================

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, 
	function () {
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
// Driver/Main - Kick this thing off!
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

// Banner =================================================
bot.dialog('/banner', [
    function (session) {
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

// Root Main Menu =========================================
bot.dialog('/rootMenu', [
    function (session) {
        builder.Prompts.choice(session, "Choose an option:", 'Our Services|See our product lines|Learn about Microblading|Make a Booking|Change a Booking|Check your upcomgin appointment|Quit');
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/rootMenu/chooseServiceDialog');
                break;
            case 1:
                session.beginDialog('/rootMenu/seeOurProductsDialog');
                break;
            case 2:
                session.beginDialog('/rootMenu/learnAboutMicroblading');
                break;
            case 3:
                session.beginDialog('/rootMenu/makeABookingDialog');
                break;
            case 4:
                session.beginDialog('/rootMenu/changeBookingDialog');
                break;
            case 5:
                session.beginDialog('/rootMenu/checkYourBookingDialog');
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
]).reloadAction('rootMenu', null, { matches: /^(menu|back|start)/i });

// Choose Service Dialog ===================================
bot.dialog('/rootMenu/chooseServiceDialog', [
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
	},

    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/rootMenu/chooseServiceDialog/cutAndStyleDialog');
                break;
            case 1:
                session.beginDialog('/rootMenu/chooseServiceDialog/blowOutAndStyleDialog');
                break;
            case 2:
                session.beginDialog('/rootMenu/chooseServiceDialog/formalStyleDialog');
                break;
            case 3:
                session.beginDialog('/rootMenu/chooseServiceDialog/colourDialog');
                break;
            case 4:
                session.beginDialog('/rootMenu/chooseServiceDialog/highlightsDialog');
                break;
            case 5:
                session.beginDialog('/rootMenu/chooseServiceDialog/manicurePedicureDialog');
                break;
            case 6:
                session.beginDialog('/rootMenu/chooseServiceDialog/facialsAndMassageDialog');
                break;
            case 7:
                session.beginDialog('/rootMenu/chooseServiceDialog/beautyDialog');
                break;
            case 8:
                session.beginDialog('/rootMenu/chooseServiceDialog/waxingDialog');
                break;
            case 9:
                session.beginDialog('/rootMenu/chooseServiceDialog/tintDialog');
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
]).reloadAction('rootMenu', null, { matches: /^(menu|back|start)/i });

// /rootMenu/chooseServiceDialog/cutAndStyleDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/cutAndStyleDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/cutAndStyleDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/blowOutAndStyleDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/blowOutAndStyleDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/blowOutAndStyleDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/formalStyleDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/formalStyleDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/formalStyleDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/colourDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/colourDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/colourDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/highlightsDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/highlightsDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/highlightsDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/manicurePedicureDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/manicurePedicureDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/manicurePedicureDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/facialsAndMassageDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/facialsAndMassageDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/facialsAndMassageDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/beautyDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/beautyDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/beautyDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/waxingDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/waxingDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/waxingDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// rootMenu/chooseServiceDialog/tintDialog ===========
bot.dialog('/rootMenu/chooseServiceDialog/tintDialog', [ 
	function (session) {
        builder.Prompts.text(session, "Hello from... /rootMenu/chooseServiceDialog/tintDialog");
    },
    function (session) {
        // Reload menu
        session.replaceDialog('/rootMenu');
    }
]);

// See Products Dialog =======================================
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

// Lean about microblading ===================================
bot.dialog('/learnAboutMicroblading', [
	function (session, args) {

		var cards = getCardsAttachments();

    // create reply with Carousel AttachmentLayout
    var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);

    session.send(reply);
	}

]);

// Make a Booking ============================================
bot.dialog('/makeABookingDialog', [
	function (session, args) {

        builder.Prompts.choice(session, "Select a time for your visit", [
            "This week",
            "Next week",
            "More times for you to choose from"
        	]);
	},
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.beginDialog('/booking/bookThisWeek');
                break;
            case 1:
                session.beginDialog('/booking/bookNextWeek');
                break;
            case 2:
                session.beginDialog('/booking/bookLater');
                break;
            default:
                session.endDialog();
                break;
        }
    }

]);

// Checkout/Confirm Booking Dialog =====================================
bot.dialog('checkoutDialog', function (session) {
    var msg;
    var cart = session.userData.cart;
    if (cart.length > 0) {
        msg = "Your appointment at the spa has been confirmed.";
    } else {
        msg = "No appoint made this conversation.";
    }
    delete session.userData.cart;
    session.endConversation(msg);
});



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

// Booking Dialog =====================================
bot.dialog('bookingDialog', [
    function (session, args) {
        if (!args.continueOrder) {
            session.userData.cart = [];
            session.send("At anytime you can say 'cancel appointment', 'view appointment', or 'make appointment'.")
        }
        builder.Prompts.choice(session, "What would you like to do?", "Pizza|Drinks|Extras");
    },
    function (session, results) {
        session.beginDialog('add' + results.response.entity);
    },
    function (session, results) {
        if (results.response) {
            session.userData.cart.push(results.response);
        }
        session.replaceDialog('orderPizzaDialog', { continueOrder: true });
    }
]).triggerAction({ 
        matches: /order.*pizza/i,
        confirmPrompt: "This will cancel the current order. Are you sure?"
  })
  .cancelAction('cancelOrderAction', "Order canceled.", { 
      matches: /(cancel.*order|^cancel)/i,
      confirmPrompt: "Are you sure?"
  })
  .beginDialogAction('viewCartAction', 'viewCartDialog', { matches: /view.*cart/i })
  .beginDialogAction('checkoutAction', 'checkoutDialog', { matches: /checkout/i });



// Incentive
bot.dialog('couponDialog', [
    function (session, args) {
        builder.Prompts.text(session, "Use this link for a deal on your next visit?");
    },
    function (session, results) {
        session.endDialog(offersList);
    }
]);

//Done - say goodbye
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


var offersList = [
    "5% off your appointment",
    "10% off product purchased at your appointment"
];

//=========================================================
// Wiring
//=========================================================

server.post('/api/messages', connector.listen());