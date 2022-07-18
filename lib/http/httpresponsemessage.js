const utils = require("utils");
function HttpResponseMessage({ message }) {
    const { contentType, contentLength, token } = message.getContentMetadata();
    const headers = {
        'Content-Type': contentType,
        'Content-Length': contentLength,
        'Token': token || 'INVALID'
    };
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return message.getId();
    }});
    Object.defineProperty(this, 'getHeaders', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getStatusCode', { configurable: false, writable: false, value: () => {
        const { code } = message.getMessageStatus();
        return code;
    }});
    Object.defineProperty(this, 'getStatusMessage', { configurable: false, writable: false, value: () => {
        const { description } = message.getMessageStatus();
        return description
    }});
    Object.defineProperty(this, 'getContent', { configurable: false, writable: false, value: () => {
        return message.getContent();
    }});
    Object.defineProperty(this, 'getContentType', { configurable: false, writable: false, value: () => {
        return headers['Content-Type'];
    }});
    Object.defineProperty(this, 'getContentLength', { configurable: false, writable: false, value: () => {
        return headers['Content-Length'];
    }});
    Object.defineProperty(this, 'getSenderAddress', { configurable: false, writable: false, value: () => {
        return message.getSenderAddress();
    }});
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        return message.getRecipientAddress();
    }});
    Object.defineProperty(this, 'getToken', { configurable: false, writable: false, value: () => {
        return message.getToken();
    }});
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value: () => {
        return message.getContentMetadata();
    }});
    Object.defineProperty(this, 'getMessageStatus', { configurable: false, writable: false, value: () => {
        return message.getMessageStatus();
    }});
};
HttpResponseMessage.prototype.getId = function() {};
HttpResponseMessage.prototype.getHeaders = function() {};
HttpResponseMessage.prototype.getStatusCode = () => {};
HttpResponseMessage.prototype.getStatusMessage = () => {};
HttpResponseMessage.prototype.getContent = () => {};
HttpResponseMessage.prototype.getContentType = () => {};
HttpResponseMessage.prototype.getContentLength = () => {};
HttpResponseMessage.prototype.getSenderAddress = () => {};
HttpResponseMessage.prototype.getRecipientAddress = () => {};
HttpResponseMessage.prototype.getToken = function() {};
HttpResponseMessage.prototype.getContentMetadata = function() {};
HttpResponseMessage.prototype.getMessageStatus = function() {};
module.exports = { HttpResponseMessage };