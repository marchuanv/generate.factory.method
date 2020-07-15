const { Message } = require("./message.js");
const { ErrorMessages } = require("./errormessages");
const { Content } = require("./content");
const { MessageStatus } = require("./messagestatus.js");
function MessageFactory({ errorMessages }) {
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("the 'errorMessages' parameter is null, undefined or not of type: ErrorMessages");
    }
    const messages = [];
    Object.defineProperty(this, 'create', { writable: false, value: ({ fromHost, content, messageStatus }) => {
        if (!(content instanceof Content)) {
            throw new Error("the 'content' parameter is null, undefined or not of type: Content");
        }
        if (messageStatus && !(messageStatus instanceof MessageStatus)) {
            throw new Error("the 'messageStatus' parameter is null, undefined or not of type: MessageStatus");
        }
        const message = new Message({ 
            fromHost,
            content,
            messageStatus: messageStatus || new MessageStatus({ code: 2 }),
            errorMessages
        });
        messages.push(message);
        return message;
    }});
    Object.defineProperty(this, 'get', { writable: false, value: ({ messageId }) => {
        return messages.find(msg => msg.getId() === messageId);
    }});
}
MessageFactory.prototype.create = function({ fromHost, content, messageStatus }) {}
module.exports = { MessageFactory };