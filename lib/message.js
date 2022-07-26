const utils = require("utils");
function Message({ Id, messageContent, messageContentMetadata, messageMetadata, messageStatus, senderAddress, recipientAddress }) {
    const messageId = Id || utils.generateGUID();
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return messageId;
    }});
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value: () => {
        return senderAddress;
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        return recipientAddress;
    }});
    Object.defineProperty(this, 'getEncryptedContent', { configurable: false, writable: false, value: () => {
        return messageContent.getEncryptedData();
    }});
    Object.defineProperty(this, 'getDecryptedContent', { configurable: false, writable: false, value: () => {
        return messageContent.getDecryptedData();
    }});
    Object.defineProperty(this, 'getMessageMetadata', { configurable: false, writable: false, value: () => {
        return messageMetadata;
    }});
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value: () => {
        return messageContentMetadata;
    }});
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value: () => {
        return messageStatus.root();
    }});
};
Message.prototype.getId = function() {};
Message.prototype.getSenderAddress = function() {};
Message.prototype.getRecipientAddress = function() {};
Message.prototype.getDecryptedContent = function() {};
Message.prototype.getEncryptedContent = function() {};
Message.prototype.getMessageMetadata = function() {};
Message.prototype.getContentMetadata = function() {};
Message.prototype.getMessageStatus = function() {};
Message.prototype.getUserIdentity = function() {};
module.exports = { Message };
