const { Content } = require('./content');
const { MessageStatus } = require('./messagestatus');
const utils = require("utils");
function Message({ content, messageStatus }) {
    if (!(content instanceof Content)) {
        throw new Error("the 'content' parameter is null, undefined or not of type: Content");
    }
    if (!(messageStatus instanceof MessageStatus)) {
        throw new Error("the 'messageStatus' parameter is null, undefined or not of type: MessageStatus");
    }
    const messageId = utils.generateGUID();
    Object.defineProperty(this, 'getId', { writable: false, value: () => {
        return messageId;
    }});
    Object.defineProperty(this, 'getTimeout', { writable: false, value: () => {
        return 3000;
    }});
    Object.defineProperty(this, 'getRecipientAddress', { writable: false, value: () => {
        return content.getMetadata().sender;
    }});
    Object.defineProperty(this, 'getContent', { writable: false, value: () => {
        return content.getData();
    }});
    Object.defineProperty(this, 'getContentMetadata', { writable: false, value: () => {
        return content.getMetadata();
    }});
    Object.defineProperty(this, 'getMessageStatus', { writable: false, value: () => {
        return messageStatus;
    }});
};
Message.prototype.getId = function() {};
Message.prototype.getRecipientAddress = function() {};
Message.prototype.getContent = function() {};
Message.prototype.getContentMetadata = function() {};
Message.prototype.getMessageStatus = function() {};
module.exports = { Message };
