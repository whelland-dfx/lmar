//module.exports = function (session) {
//    session.error('Hair Dialog is not implemented and is currently set to throw Bot error handling');
//};

//=========================================================
// Conversation Structure - Hair
//=========================================================


var builder = require('botbuilder');
//var Store = require('./store');

module.exports = [
    // Destination
    function (session) {
        session.send('Welcome to the Hotels finder!');
        builder.Prompts.text(session, 'Please enter your destination');
    },
    function (session, results, next) {
        session.dialogData.destination = results.response;
        session.send('Looking for hotels in %s', results.response);
        next();
    },

    // Check-in
    function (session) {
        builder.Prompts.time(session, 'When do you want to check in?');
    },
    function (session, results, next) {
        session.dialogData.checkIn = results.response.resolution.start;
        next();
    },

    // Nights
    function (session) {
        builder.Prompts.number(session, 'How many nights do you want to stay?');
    },
    function (session, results, next) {
        session.dialogData.nights = results.response;
        next();
    },

    // Search...
    function (session) {
        var destination = session.dialogData.destination;
        var checkIn = new Date(session.dialogData.checkIn);
        var checkOut = checkIn.addDays(session.dialogData.nights);

        session.send(
            'Ok. Searching for Hotels in %s from %d/%d to %d/%d...',
            destination,
            checkIn.getMonth() + 1, checkIn.getDate(),
            checkOut.getMonth() + 1, checkOut.getDate());

        // Async search
        Store
            .searchHotels(destination, checkIn, checkOut)
            .then(function (hotels) {
                // Results
                session.send('I found in total %d hotels for your dates:', hotels.length);

                var message = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(hotels.map(hotelAsAttachment));

                session.send(message);

                // End
                session.endDialog();
            });
    }
];



// Helpers

/**
 * Wrapper function to simplify calling our progress dialog.
 * @param {*} session Current session object.  
 * @param {*} options Options to control messages sent by the progress dialog. 
 *      Values:
 *          * text:         (Required) progress text to send.
 *          * speak:        (Optional) ssml to send with each progress message.
 *          * delay:        (Optional) delay (in ms) before progress is sent.
 *          * initialText:  (Optional) initial progress text.
 *          * initialSpeak: (Optional) initial progress ssml.
 *          * initialDelay: (Optional) delay before initial progress is sent.
 * @param {*} asyncFn Async function to call. Will be passed a callback with a 
 *      signature of (response: any) => void.  
 */
function hotelAsAttachment(hotel) {
    return new builder.HeroCard()
        .title(hotel.name)
        .subtitle('%d stars. %d reviews. From $%d per night.', hotel.rating, hotel.numberOfReviews, hotel.priceStarting)
        .images([new builder.CardImage().url(hotel.image)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.bing.com/search?q=hotels+in+' + encodeURIComponent(hotel.location))
        ]);
}

/**
 * Wrapper function to simplify calling our progress dialog.
 * @param {*} session Current session object.  
 * @param {*} options Options to control messages sent by the progress dialog. 
 *      Values:
 *          * text:         (Required) progress text to send.
 *          * speak:        (Optional) ssml to send with each progress message.
 *          * delay:        (Optional) delay (in ms) before progress is sent.
 *          * initialText:  (Optional) initial progress text.
 *          * initialSpeak: (Optional) initial progress ssml.
 *          * initialDelay: (Optional) delay before initial progress is sent.
 * @param {*} asyncFn Async function to call. Will be passed a callback with a 
 *      signature of (response: any) => void.  
 */
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};