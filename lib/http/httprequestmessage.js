const utils = require("utils");
function HttpRequestMessage({ message, path, method }) {
    const { senderHost, senderPort } = message.getSenderAddress();
    const { contentType, contentLength, token } = message.getContentMetadata();
    const headers = { 'Content-Type': contentType, 'Content-Length': contentLength, 'Token': token || 'INVALID', senderHost, senderPort };
    Object.defineProperty(this, 'getId', { configurable: false, writable: false, value: () => {
        return message.getId();
    }});
    Object.defineProperty(this, 'getHeaders', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
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
    Object.defineProperty(this, 'getPath', { configurable: false, writable: false, value: () => {
        return path;
    }});
    Object.defineProperty(this, 'getMethod', { configurable: false, writable: false, value: () => {
        return method;
    }});
    Object.defineProperty(this, 'getToken', { configurable: false, writable: false, value: () => {
        return message.getToken();
    }});
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value: () => {
        return message.getContentMetadata();
    }});
};
HttpRequestMessage.prototype.getId = function() {};
HttpRequestMessage.prototype.getHeaders = function() {};
HttpRequestMessage.prototype.getContent = function() {};
HttpRequestMessage.prototype.getContentType = function() {};
HttpRequestMessage.prototype.getContentLength = function() {};
HttpRequestMessage.prototype.getSenderAddress = () => {};
HttpRequestMessage.prototype.getRecipientAddress = () => {};
HttpRequestMessage.prototype.getPath = function() {};
HttpRequestMessage.prototype.getToken = function() {};
HttpRequestMessage.prototype.getContentMetadata = function() {};
HttpRequestMessage.prototype.validate = function() {};
module.exports = { HttpRequestMessage };