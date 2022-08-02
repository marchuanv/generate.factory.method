const utils = require("utils");
function HttpResponseMessage({ message }) {
    const { senderHost, senderPort } = message.getSenderAddress();
    const { recipientHost, recipientPort } = message.getRecipientAddress();
    const { token, remotebase64rsapublickey, userid } = message.getMessageMetadata();
    const { contentType, contentLength } = message.getContentMetadata();
    const headers = {
        'Content-Type': contentType.description,
        'Content-Length': contentLength,
        'Token': token || 'INVALID',
        senderhost: senderHost, senderport: senderPort,
        recipienthost: recipientHost, recipientport: recipientPort,
        remotebase64rsapublickey,
        userid
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

HttpResponseMessage.prototype.getId = function() {};
HttpResponseMessage.prototype.getEncryptedContent = function() {};
HttpResponseMessage.prototype.getDecryptedContent = function() {};
HttpResponseMessage.prototype.getSenderAddress = function() {};
HttpResponseMessage.prototype.getRecipientAddress = function() {};
HttpResponseMessage.prototype.getContentMetadata = function() {};
HttpResponseMessage.prototype.getMessageMetadata = function() {};
HttpResponseMessage.prototype.getHeaders = function() {};
HttpResponseMessage.prototype.getMessageStatus = function() {};
HttpResponseMessage.prototype.getStatusCode = function() {};
HttpResponseMessage.prototype.getStatusMessage = function() {};

module.exports = { HttpResponseMessage };