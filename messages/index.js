
//=========================================================
// Setup All dependancies
//=========================================================

'use strict';

const restify = require('restify');
require('dotenv').config();

"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});


var DialogLabels = {
    Hair: 'Hair',
    Colour: 'Colour',
    Spa: 'Spa',
    Skin: 'Skin',
    Tint: 'Tint'
};

const server = restify.createServer();
server.post('/api/messages', bot.connector('*').listen());
server.listen(process.env.PORT, () => {
    console.log(`${server.name} listening to ${server.url}`);
});








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
