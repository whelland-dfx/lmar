/*-----------------------------------------------------------------------------
Exported Appointment Setter Prompt. The create() function should be
called once at startup and then beginDialog() can be called everytime you
wish to invoke the prompt.
-----------------------------------------------------------------------------*/

var builder = require('botbuilder');


// Setup bot and default message handler
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Say 'order pizza' to start a new order. ")
});

// Add dialog to manage ordering a pizza
bot.dialog('orderPizzaDialog', [
    function (session, args) {
        if (!args.continueOrder) {
            session.userData.cart = [];
            session.send("At anytime you can say 'cancel order', 'view cart', or 'checkout'.")
        }
        builder.Prompts.choice(session, "What would you like to add?", "Pizza|Drinks|Extras");
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



// Add pizza menu option
bot.dialog('addPizza', [
    function (session) {
        builder.Prompts.choice(session, "What kind of pizza?", "Hawaiian|Meat Lovers|Supreme");
    },
    function (session, results) {
        session.dialogData.pizza = results.response.entity;
        builder.Prompts.choice(session, "What size?", 'Small 8"|Medium 10"|Large 12"');
    },
    function (session, results) {
        var item = results.response.entity + ' ' + session.dialogData.pizza + ' Pizza';
        session.endDialogWithResult({ response: item });
    }
]).cancelAction('cancelItemAction', "Item canceled.", { matches: /(cancel.*item|^cancel)/i });




// Add drink menu option
bot.dialog('addDrinks', [
    function (session) {
        builder.Prompts.choice(session, "What kind of 2 Liter drink?", "Coke|Sprite|Pepsi");
    },
    function (session, results) {
        session.endDialogWithResult({ response: '2 Liter ' + results.response.entity });
    }
]).cancelAction('cancelItemAction', "Item canceled.", { matches: /(cancel.*item|^cancel)/i });

// Add extras menu option
bot.dialog('addExtras', [
    function (session) {
        builder.Prompts.choice(session, "What kind of extra?", "Salad|Breadsticks|Wings");
    },
    function (session, results) {
        session.endDialogWithResult({ response: results.response.entity });
    }
]).cancelAction('cancelItemAction', "Item canceled.", { matches: /(cancel.*item|^cancel)/i });









// Dialog for showing the users cart
bot.dialog('viewCartDialog', function (session) {
    var msg;
    var cart = session.userData.cart;
    if (cart.length > 0) {
        msg = "Items in your cart:";
        for (var i = 0; i < cart.length; i++) {
            msg += "\n* " + cart[i];
        }
    } else {
        msg = "Your cart is empty.";
    }
    session.endDialog(msg);
});

// Dialog for checking out
bot.dialog('checkoutDialog', function (session) {
    var msg;
    var cart = session.userData.cart;
    if (cart.length > 0) {
        msg = "Your order is on its way.";
    } else {
        msg = "Your cart is empty.";
    }
    delete session.userData.cart;
    session.endConversation(msg);
});