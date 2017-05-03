
//=========================================================
// Setup All requires, vars and constants
//=========================================================

'use strict';

const restify = require('restify');
require('dotenv').config();
const bot = require('./bot.js');
var builder = require('botbuilder');
var botbuilder_azure = require('botbuilder-azure');


//=========================================================
// Plumbing
//=========================================================

var useEmulator = (process.env.NODE_ENV == 'development');

const connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MICROSOFT_APP_ID'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

const server = restify.createServer();
server.post('/api/messages', bot.connector('*').listen());
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});


//=========================================================
// Conversation Structure - Dialog Labels
//=========================================================

var DialogLabels = {
    Hair: 'Hair',
    Colour: 'Colour',
    Spa: 'Spa',
    Skin: 'Skin',
    Tint: 'Tint'
};




//=========================================================
// Conversation Structure - MAIN
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



//=========================================================
// Conversation Actions
//=========================================================

bot.dialog('hair', require('./hair'))
    .triggerAction({
        matches: [/cut/i,/hair/i]
    });
bot.dialog('colour', require('./colour'))
    .triggerAction({
        matches: [/colour/i, /color/i]
    });
bot.dialog('spa', require('./spa'))
    .triggerAction({
        matches: [/spa/i]
    });
bot.dialog('skin', require('./skin'))
    .triggerAction({
        matches: [/skin/i]
    });
bot.dialog('tint', require('./tint'))
    .triggerAction({
        matches: [/tint/i]
    });
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

//=========================================================
// Error logging
//=========================================================

bot.on('error', function (e) {
    console.log('An error has ocurred: ', e);
});
