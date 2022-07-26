const utils = require("utils");
function HttpRequestMessage({ message, path }) {
    const { senderHost, senderPort } = message.getSenderAddress();
    const { token, remotebase64rsapublickey, userid } = message.getMessageMetadata();
    const { contentType, contentLength } = message.getContentMetadata();
    const headers = { 
        'Content-Type': contentType,
        'Content-Length': contentLength,
        'Token': token || 'INVALID',
        senderHost, senderPort,
        remotebase64rsapublickey,
        userid
    };
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: message.getId });
    Object.defineProperty(this, 'getEncryptedContent', { configurable: false, writable: false, value: message.getEncryptedContent });
    Object.defineProperty(this, 'getDecryptedContent', { configurable: false, writable: false, value: message.getDecryptedContent });
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value:message.getSenderAddress });
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value:  message.getRecipientAddress });
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value:  message.getContentMetadata });
    Object.defineProperty(this, 'getMessageMetadata', { configurable: false, writable: false, value:  message.getMessageMetadata });

    Object.defineProperty(this, 'getHeaders', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getPath', { configurable: false, writable: false, value: () => {
        return path;
    }});
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value: () => {
        const status = message.getMessageStatus();
        return status.match({ wildcard: 'http'});
    }});
};

HttpRequestMessage.prototype.getId = function() {};
HttpRequestMessage.prototype.getEncryptedContent = function() {};
HttpRequestMessage.prototype.getDecryptedContent = function() {};
HttpRequestMessage.prototype.getSenderAddress = function() {};
HttpRequestMessage.prototype.getRecipientAddress = function() {};
HttpRequestMessage.prototype.getContentMetadata = function() {};
HttpRequestMessage.prototype.getMessageMetadata = function() {};
HttpRequestMessage.prototype.getHeaders = function() {};
HttpRequestMessage.prototype.getPath = function() {};
HttpRequestMessage.prototype.getMessageStatus = function() {};

module.exports = { HttpRequestMessage };