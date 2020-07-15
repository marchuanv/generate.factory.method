const { ErrorMessages } = require("../errormessages.js");
const { WebSocketMessageFactory } = require("./websocketmessagefactory.js");
const { WebSocketMessageHandler } = require("./websocketmessagehandler.js");
function WebSocketMessageHandlerFactory({ websocketMessageFactory, errorMessages }) {
    if (!(websocketMessageFactory instanceof WebSocketMessageFactory)) {
        throw new Error("'websocketMessageFactory' parameter is not of type: WebSocketMessageFactory");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("'errorMessages' parameter is not of type: ErrorMessages");
    }
    this.websocketMessageFactory = websocketMessageFactory;
    this.errorMessages = errorMessages;
}
WebSocketMessageHandlerFactory.prototype.create = function({ }) {
    return new WebSocketMessageHandler({ 
        websocketMessageFactory: this.websocketMessageFactory,
        errorMessages: this.errorMessages
    });
}
module.exports = { WebSocketMessageHandlerFactory };