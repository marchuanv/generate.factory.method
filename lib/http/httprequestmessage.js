const utils = require("utils");
function HttpRequestMessage({ message, path, method }) {
    const { contentType, contentLength, token, sender } = message.getContentMetadata();
    const headers = { 'Content-Type': contentType, 'Content-Length': contentLength, 'Token': token || 'INVALID', 'Sender-Address': sender };
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
        return headers['Sender-Address'];
    }});
    Object.defineProperty(this, 'getPath', { configurable: false, writable: false, value: () => {
        return path;
    }});
    Object.defineProperty(this, 'getMethod', { configurable: false, writable: false, value: () => {
        return method;
    }});
    Object.defineProperty(this, 'validate', { configurable: false, writable: false, value: () => {
        if (!(this.getId())) {
            throw new Error("http request message requires a valid message id");
        }
        if (!(this.getHeaders())) {
            throw new Error("http request message requires valid http request headers");
        }
        if (!(this.getContent())) {
            throw new Error("http request message requires valid content");
        }
        if (!(this.getContentType())) {
            throw new Error("http request message requires a valid content type");
        }
        if (!(this.getContentLength())) {
            throw new Error("http request message requires valid content length");
        }
        if (!(this.getSenderAddress())) {
            throw new Error("http response message requires a valid sender address");
        }
        if (!(this.getPath())) {
            throw new Error("http response message requires a valid path");
        }
        if (!(this.getMethod())) {
            throw new Error("http response message requires a valid method");
        }
    }});
};
HttpRequestMessage.prototype.getId = function() {};
HttpRequestMessage.prototype.getHeaders = function() {};
HttpRequestMessage.prototype.getContent = function() {};
HttpRequestMessage.prototype.getContentType = function() {};
HttpRequestMessage.prototype.getContentLength = function() {};
HttpRequestMessage.prototype.getSenderAddress = () => {};
HttpRequestMessage.prototype.getPath = function() {};
HttpRequestMessage.prototype.validate = function() {};
module.exports = { HttpRequestMessage };