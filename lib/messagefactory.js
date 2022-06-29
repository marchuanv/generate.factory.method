const { Message } = require("./message");
const { Content } = require("./content");
const { MessageStatus } = require("./messagestatus");
const { MessageStore } = require("./messagestore");
const { Encryption } = require("./encryption");
function MessageFactory({ encryption, messageStore }) {
    if (!(encryption instanceof Encryption)) {
        throw new Error("the 'encryption' parameter is null, undefined or not of type: Encryption");
    }
    if (!(messageStore instanceof MessageStore)) {
        throw new Error("the 'messageStore' parameter is null, undefined or not of type: MessageStore");
    }
    Object.defineProperty(this, 'create', { writable: false, value: ({ data, metadata, messageStatus }) => {
        const content = new Content({ data, metadata, encryption });
        const message = new Message({ content, messageStatus: messageStatus || new MessageStatus({ code: 2 })});
        messageStore.save({ message });
        return message;
    }});
    Object.defineProperty(this, 'get', { writable: false, value: ({ messageId }) => {
        return messageStore.get({ messageId });
    }});
}
MessageFactory.prototype.create = function({ data, metadata, messageStatus }) {}
MessageFactory.prototype.get = function({ messageId }) {}
module.exports = { MessageFactory };
