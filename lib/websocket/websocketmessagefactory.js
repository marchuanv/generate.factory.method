
const { ErrorMessages } = require("../errormessages");
const { MessageFactory } = require("../messagefactory");
function WebSocketMessageFactory({ messageFactory, errorMessages }) {
    if (!(messageFactory instanceof MessageFactory)) {
        throw new Error("the 'messageFactory' parameter is null, undefined or not of type: MessageFactory");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("the 'errorMessages' parameter is null, undefined or not of type: ErrorMessages");
    }
    Object.defineProperty(this, 'create', { writable: false, value: ({ data, messageStatus  }) => {
        const message = messageFactory.create({ data, messageStatus });
       
    }});
}
WebSocketMessageFactory.prototype.create = function({ data, messageStatus  }) {}
module.exports = { WebSocketMessageFactory };