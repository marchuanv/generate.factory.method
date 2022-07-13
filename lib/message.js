const utils = require("utils");
function Message({ messageContent, messageContentMetadata, messageStatus, senderAddress }) {
    const messageId = utils.generateGUID();
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return messageId;
    }});
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value: () => {
        return senderAddress;
    }});
    Object.defineProperty(this, 'getContent', { configurable: false, writable: false, value: () => {
        return messageContent.getData();
    }});
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value: () => {
        return messageContentMetadata;
    }});
    Object.defineProperty(this, 'getToken', { configurable: false, writable: false, value: () => {
        return messageContentMetadata.token;
    }});
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value: () => {
        return messageStatus;
    }});
};
Message.prototype.getId = function() {};
Message.prototype.getSenderAddress = function() {};
Message.prototype.getContent = function() {};
Message.prototype.getContentMetadata = function() {};
Message.prototype.getMessageStatus = function() {};
Message.prototype.getToken = function() {};
module.exports = { Message };
