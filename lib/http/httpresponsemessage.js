const utils = require("utils");

function HttpResponseMessage({ message }) {
    const { token, remotebase64rsapublickey, userid } = message.getMessageMetadata();
    const { contentType, contentLength } = message.getContentMetadata();
    const headers = {
        'Content-Type': contentType,
        'Content-Length': contentLength,
        'Token': token || 'INVALID',
        remotebase64rsapublickey,
        userid
    };
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: message.getId });
    Object.defineProperty(this, 'getEncryptedContent', { configurable: false, writable: false, value: message.getEncryptedContent });
    Object.defineProperty(this, 'getDecryptedContent', { configurable: false, writable: false, value: message.getDecryptedContent });
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value:message.getSenderAddress });
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value:  message.getContentMetadata });
    Object.defineProperty(this, 'getMessageMetadata', { configurable: false, writable: false, value:  message.getMessageMetadata });
    Object.defineProperty(this, 'getToken', { configurable: false, writable: false, value: message.getToken });
    Object.defineProperty(this, 'getStatusMessage', { configurable: false, writable: false, value: this.getMessageStatus });

    Object.defineProperty(this, 'getHeaders', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getStatusCode', { configurable: false, writable: false, value: () => {
        const { code } = this.getMessageStatus();
        return code;
    }});
    Object.defineProperty(this, 'getContentType', { configurable: false, writable: false, value: () => {
        return headers['Content-Type'];
    }});
    Object.defineProperty(this, 'getContentLength', { configurable: false, writable: false, value: () => {
        return headers['Content-Length'];
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        return message.getRecipientAddress();
    }});
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value: () => {
        const status = message.getMessageStatus();
        return status.match({ wildcard: 'http'});
    }});
};

HttpResponseMessage.prototype.getId = function() {};
HttpResponseMessage.prototype.getHeaders = function() {};
HttpResponseMessage.prototype.getStatusCode = () => {};
HttpResponseMessage.prototype.getStatusMessage = () => {};
HttpResponseMessage.prototype.getEncryptedContent = () => {};
HttpResponseMessage.prototype.getDecryptedContent = () => {};
HttpResponseMessage.prototype.getContentType = () => {};
HttpResponseMessage.prototype.getContentLength = () => {};
HttpResponseMessage.prototype.getSenderAddress = () => {};
HttpResponseMessage.prototype.getRecipientAddress = () => {};
HttpResponseMessage.prototype.getToken = function() {};
HttpResponseMessage.prototype.getContentMetadata = function() {};
HttpResponseMessage.prototype.getMessageMetadata = function() {};
HttpResponseMessage.prototype.getMessageStatus = function() {};

module.exports = { HttpResponseMessage };