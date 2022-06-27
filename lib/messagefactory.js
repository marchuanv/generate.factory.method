const { Message } = require("./message.js");
const { Content } = require("./content");
const { MessageStatus } = require("./messagestatus.js");
function MessageFactory(encryption) {
    const messages = [];
    Object.defineProperty(this, 'create', { writable: false, value: ({ address, data, metadata, messageStatus }) => {
        if (messageStatus && !(messageStatus instanceof MessageStatus)) {
            throw new Error("the 'messageStatus' parameter is null, undefined or not of type: MessageStatus");
        }
        const content = new Content({ data, metadata, encryption });
        const message = new Message({
            address,
            content,
            messageStatus: messageStatus || new MessageStatus({ code: 2 })
        });
        messages.push(message);
        return message;
    }});
    Object.defineProperty(this, 'get', { writable: false, value: ({ messageId }) => {
        return messages.find(msg => msg.getId() === messageId);
    }});
}
MessageFactory.prototype.create = function({ address, data, metadata, messageStatus }) {}
module.exports = { MessageFactory };