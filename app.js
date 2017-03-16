

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
// Bot Setuo the bot object
//=========================================================

var bot = new builder.UniversalBot(connector);

//=========================================================
// Bot Set the intent object
//=========================================================

var intents = new builder.IntentDialog();


//=========================================================
// Bot path - intro and customer interest identification
//=========================================================

var bot = new builder.UniversalBot(connector, [
    function (session) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("Hairhaus - London Ontario")
            .images([
                 builder.CardImage.create(session, "http://hairhaus.ca/images/hair-haus-logo-white.jpg")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);

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
        session.userData.serviceChoice = results.response.entity;
        session.send("Got it... " + session.userData.serviceChoice + 
                     ". Lets get an appt booked for you.");
        session.beginDialog('/products');
    }
]);


bot.dialog('/banner', [
    function (session) {
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

bot.dialog('/done', [
    function (session) {
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


bot.dialog('/products', [
	function (session) {

		var cards = getCardsAttachments();

    // create reply with Carousel AttachmentLayout
    var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);

    session.send(reply);
	}

]);


//=========================================================
// Functions
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

//=========================================================
// Wiring
//=========================================================

server.post('/api/messages', connector.listen());