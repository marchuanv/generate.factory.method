const utils = require("utils");
const { HttpResponseMessage } = require("./httpresponsemessage.prototype");
HttpResponseMessage.prototype.constructor = function({ message }) {
    const { senderAddress } = message.getSenderAddress();
    const { senderHost, senderPort } = senderAddress;
    const { recipientAddress } = message.getRecipientAddress();
    const { recipientHost, recipientPort } = recipientAddress;
    const { token } = message.getMessageMetadata();
    const { contentType, contentLength } = message.getContentMetadata();
    const headers = {
        'Content-Type': contentType.description,
        'Content-Length': contentLength,
        senderhost: senderHost, senderport: senderPort,
        recipienthost: recipientHost, recipientport: recipientPort,
        token
    };
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: message.getId });
    Object.defineProperty(this, 'getEncryptedContent', { configurable: false, writable: false, value: message.getEncryptedContent });
    Object.defineProperty(this, 'getDecryptedContent', { configurable: false, writable: false, value: message.getDecryptedContent });
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value:message.getSenderAddress });
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: message.getRecipientAddress });
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value:  message.getContentMetadata });
    Object.defineProperty(this, 'getMessageMetadata', { configurable: false, writable: false, value:  message.getMessageMetadata });
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value:  message.getMessageStatus });
    Object.defineProperty(this, 'getHeaders', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getStatusCode', { configurable: false, writable: false, value: () => {
        const status = message.getMessageStatus();
        const { code } = status.match({ wildcard: 'http'});
        return code;
    }});
    Object.defineProperty(this, 'getStatusMessage', { configurable: false, writable: false, value: () => {
        const status = message.getMessageStatus();
        const { description } = status.match({ wildcard: 'http'});
        return description ;
    }});
};
module.exports = { HttpResponseMessage };
