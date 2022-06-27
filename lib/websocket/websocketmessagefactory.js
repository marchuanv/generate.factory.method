
const { MessageFactory } = require("../messagefactory");
function WebSocketMessageFactory({ messageFactory }) {
    if (!(messageFactory instanceof MessageFactory)) {
        throw new Error("the 'messageFactory' parameter is null, undefined or not of type: MessageFactory");
    }
    Object.defineProperty(this, 'create', { writable: false, value: ({ data, messageStatus  }) => {
        const message = messageFactory.create({ data, messageStatus });
       
    }});
}
WebSocketMessageFactory.prototype.create = function({ data, messageStatus  }) {}
module.exports = { WebSocketMessageFactory };