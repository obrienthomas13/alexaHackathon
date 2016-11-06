// This code sample shows how to use an in-line dataset within your skill Lambda code.

// var AWS = require('aws-sdk');


exports.handler = function( event, context ) {
    var say = "";
    var shouldEndSession = false;
    var sessionAttributes = {};
    var myState = "";
    var pop = 0;
    var rank = 0;

    // The dataset array below could also be stored in a separate file, like so:
    // var dataset = require('./datafiles/dataset.js');

    var dataset = // array
        [
            {"Name":"California","population":39100000,"rank":1},
            {"Name":"Texas","population":27500000,"rank":2},
            {"Name":"Florida","population":20300000,"rank":3},
            {"Name":"New York","population":19800000,"rank":4},
            {"Name":"Illinois","population":12900000,"rank":5},
            {"Name":"Pennsylvania","population":12800000,"rank":6},
            {"Name":"Ohio","population":11600000,"rank":7},
            {"Name":"Georgia","population":10200000,"rank":8},
            {"Name":"North Carolina","population":10000000,"rank":9},
            {"Name":"Michigan","population":9900000,"rank":10},
            {"Name":"New Jersey","population":9000000,"rank":11},
            {"Name":"Virginia","population":8400000,"rank":12},
            {"Name":"Washington","population":7200000,"rank":13},
            {"Name":"Arizona","population":6800000,"rank":14},
            {"Name":"Massachusetts","population":6800000,"rank":15},
            {"Name":"Indiana","population":6600000,"rank":16},
            {"Name":"Tennessee","population":6600000,"rank":17},
            {"Name":"Missouri","population":6100000,"rank":18},
            {"Name":"Maryland","population":6000000,"rank":19},
            {"Name":"Wisconsin","population":5800000,"rank":20},
            {"Name":"Minnesota","population":5500000,"rank":21},
            {"Name":"Colorado","population":5500000,"rank":22},
            {"Name":"South Carolina","population":4900000,"rank":23},
            {"Name":"Alabama","population":4900000,"rank":24},
            {"Name":"Louisiana","population":4700000,"rank":25},
            {"Name":"Kentucky","population":4400000,"rank":26},
            {"Name":"Oregon","population":4000000,"rank":27},
            {"Name":"Oklahoma","population":3900000,"rank":28},
            {"Name":"Connecticut","population":3600000,"rank":29},
            {"Name":"Iowa","population":3100000,"rank":30},
            {"Name":"Utah","population":3000000,"rank":31},
            {"Name":"Mississippi","population":3000000,"rank":32},
            {"Name":"Arkansas","population":3000000,"rank":33},
            {"Name":"Kansas","population":2900000,"rank":34},
            {"Name":"Nevada","population":2900000,"rank":35},
            {"Name":"New Mexico","population":2100000,"rank":36},
            {"Name":"Nebraska","population":1900000,"rank":37},
            {"Name":"West Virginia","population":1800000,"rank":38},
            {"Name":"Idaho","population":1700000,"rank":39},
            {"Name":"Hawaii","population":1400000,"rank":40},
            {"Name":"New Hampshire","population":1300000,"rank":41},
            {"Name":"Maine","population":1300000,"rank":42},
            {"Name":"Rhode Island","population":1100000,"rank":43},
            {"Name":"Montana","population":1000000,"rank":44},
            {"Name":"Delaware","population":900000,"rank":45},
            {"Name":"South Dakota","population":900000,"rank":46},
            {"Name":"North Dakota","population":800000,"rank":47},
            {"Name":"Alaska","population":700000,"rank":48},
            {"Name":"Vermont","population":600000,"rank":49},
            {"Name":"Wyoming","population":600000,"rank":50}
        ];


    if (event.session.attributes) {
        sessionAttributes = event.session.attributes;
    }

    if (event.request.type === "LaunchRequest") {
        say = "Welcome to State Pop!  Say the name of a U.S. State.";

    } else {
        var IntentName = event.request.intent.name;

        if (IntentName === "StateRequestIntent") {

            if (event.request.intent.slots.usstate.value) {

                myState = event.request.intent.slots.usstate.value;

                // loop through dataset and find array value that matches the state the requested

                for (i = 0; i < dataset.length; i++) {
                    if (dataset[i].Name === myState) {
                        pop = dataset[i].population;
                        rank = dataset[i].rank;

                    }
                }
                say = "The population of " + myState + " is " + pop;

                // add the state to a session.attributes array
                if (!sessionAttributes.requestList) {
                    sessionAttributes.requestList = [];
                }
                sessionAttributes.requestList.push(myState);

            }

        } else if (IntentName === "AMAZON.StopIntent" || IntentName === "AMAZON.CancelIntent") {
            say = "You asked for " + sessionAttributes.requestList.toString() + ". Thanks for playing!";
            shouldEndSession = true;

        } else if (IntentName === "AMAZON.HelpIntent" ) {
            say = "Just say the name of a U.S. State, such as Massachusetts or California."

        }
    }

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



