// This code sample shows how to use an in-line dataset within your skill Lambda code.

// var AWS = require('aws-sdk');

    var weight = 150;
    var numberOfDrinks = 2;
    var height_Ft = 0;
    var height_In = 0;
    var gender = "man";
    var drinkType = "";
    var drinkAlcoholPercentage = 0.54;
    var hours = 0;

exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;

    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to Drunk Checker. Tell me your weight, gender, how long ago you drank, and how many drinks you drank";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "GenderRequest") {
            if (event.request.intent.slots.gender.value) {

                gender = event.request.intent.slots.gender.value;        

                say = gender;

            }
        } else if (IntentName === "HoursRequest") {
             if (event.request.intent.slots.hours.value) {

                hours = event.request.intent.slots.hours.value;
                say = hours;
            }

        } else if (IntentName === "WeightRequest") {
            if (event.request.intent.slots.weight.value) {
                weight = event.request.intent.slots.weight.value;
                say = weight;
            }

        } else if (IntentName === "DrinkRequest") {
            if (event.request.intent.slots.numberOfDrinks.value) {
                numberOfDrinks = event.request.intent.slots.numberOfDrinks.value;
                say = numberOfDrinks;
            }

        } else if (IntentName === "UserRequest") {
            if (event.request.intent.slots.numberOfDrinks.value) {
                numberOfDrinks = event.request.intent.slots.numberOfDrinks.value;
            }
            if (event.request.intent.slots.weight.value) {
                weight = event.request.intent.slots.weight.value;
            }
             if (event.request.intent.slots.hours.value) {
                hours = event.request.intent.slots.hours.value;
            }
            if (event.request.intent.slots.gender.value) {
                gender = event.request.intent.slots.gender.value;        
            }
            say = "You are a " + weight + " pound " + gender + " who drank " + numberOfDrinks + " drinks in " + hours + " hours ";
    
        } else if (IntentName === "CalculateRequest") {
            var bacPerOz = (1.882816/((weight/2.2046)*(gender == "man" ? 0.58 : 0.49))) - (hours * 0.015);   

            var bac = (numberOfDrinks * drinkAlcoholPercentage * bacPerOz).toFixed(3);
            if (bac > 0.08) {
                say = "You should not drive. Your blood alcohol content is " + bac + " percent. Would you like me to call you an uber?";
            } else if (bac > 0.25) {
                say = "WARNING. You should stop drinking and definitely not drive. Your blood alcohol content is " + bac + " percent. Would you like me to call help?";
            } else if (bac > 0.4) {
                say = "You may be dead. Your blood alcohol content is " + bac + " percent";
            } else {
                say = "You good. Your blood alchohol content is only " + bac + " percent. You could drink more.";
            }


        } else if (IntentName === "AMAZON.StartOverIntent") {
            say = "Let's restart";
                weight = 150;
                numberOfDrinks = 2;
                height_Ft = 0;
                height_In = 0;
                gender = "man";
                drinkType = "";
                drinkAlcoholPercentage = 0.54;
                hours = 0;

        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."

        }
    }

    // if (numberOfDrinks > 0 && height_Ft > 0 && weight > 0 && gender != "") {
    //     say = "yay you gave us info";
    // }

    // This line concludes the lambda call.  Move this line to within any asynchronous callbacks that return and use data.
    context.succeed({sessionAttributes: sessionAttributes, response: buildSpeechletResponse(say, shouldEndSession) });

};

function buildSpeechletResponse(say, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: "<speak>" + say + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>Please try again. " + say + "</speak>"
            }
        },
        card: {
            type: "Simple",
            title: "My Card Title",
            content: "My Card Content, displayed on the Alexa App or alexa.amazon.com"
        },

        shouldEndSession: shouldEndSession
    };
}




