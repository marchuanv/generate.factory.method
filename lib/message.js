const utils = require("utils");
const { createRecipientAddress } = require("./factory/recipientaddress.factory");
const { createSenderAddress } = require("./factory/senderaddress.factory");
function Message({ scopeId, Id, messageContent, messageContentMetadata, messageMetadata, messageStatus }) {
    const messageId = Id || utils.generateGUID();
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return messageId;
    }});
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value: () => {
        const { senderhost, senderport  } = messageMetadata;
        return createSenderAddress({ scopeId, senderHost: senderhost, senderPort: senderport });
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        const { recipienthost, recipientport  } = messageMetadata;
        return createRecipientAddress({ scopeId, recipientHost: recipienthost, recipientPort: recipientport });
    }});
    Object.defineProperty(this, 'getEncryptedContent', { configurable: false, writable: false, value: () => {
        return messageContent.encryptedData;
    }});
    Object.defineProperty(this, 'getDecryptedContent', { configurable: false, writable: false, value: () => {
        return messageContent.decryptedData;
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
Message.prototype.getEncryptedContent = function() {};
Message.prototype.getDecryptedContent = function() {};
Message.prototype.getMessageMetadata = function() {};
Message.prototype.getContentMetadata = function() {};
Message.prototype.getMessageStatus = function() {};
module.exports = { Message };
