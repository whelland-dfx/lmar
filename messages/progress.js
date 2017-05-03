

//=========================================================
// Helper Utils - Progress - Under dev - not complete
//=========================================================



module.exports = [

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
    function progress(session, options, asyncFn) {
        session.beginDialog('progressDialog', {
            asyncFn: asyncFn,
            options: options
        })
    }








];





bot.dialog('progressDialog', function (session, args) {
    var asyncFn = args.asyncFn;
    var options = args.options;

    var count = 0;
    function sendProgress() {
        if (count++ > 0) {
            session.say(options.text, options.speak, { inputHint: builder.InputHint.ignoringInput });
        } else {
            var text = options.initialText || options.text;
            var speak = options.initialSpeak || options.speak;
            session.say(text, speak, { inputHint: builder.InputHint.ignoringInput });
        }
        hTimer = setTimeout(sendProgress, options.delay || 9000);
    }

    // Start progress timer
    var hTimer = setTimeout(sendProgress, options.initialDelay || 1000);

    // Call async function
    try {
        asyncFn(function (response) {
            // Stop timer and return response
            clearTimeout(hTimer);
            session.endDialogWithResult({ response: response });
        });
    } catch (err) {
        session.error(err);
    }
});