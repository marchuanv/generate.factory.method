const utils = require("utils");
const { createRecipientAddress } = require("./factory/generated/recipientaddress/recipientaddress.factory");
const { createSenderAddress } = require("./factory/generated/senderaddress/senderaddress.factory");
const { Message } = require("./message.prototype");
Message.prototype.constructor = function({ 
    contextName,
    Id,
    messageContent,
    messageContentMetadata,
    messageMetadata,
    messageStatus
}) {
    const messageId = Id || utils.generateGUID();
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return messageId;
    }});
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value: () => {
        const { senderhost, senderport  } = messageMetadata;
        return createSenderAddress({ contextName, senderHost: senderhost, senderPort: senderport });
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        const { recipienthost, recipientport  } = messageMetadata;
        return createRecipientAddress({ contextName, recipientHost: recipienthost, recipientPort: recipientport });
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
module.exports = { Message };
