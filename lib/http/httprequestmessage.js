const { Message } = require("../message");
const utils = require("utils");
function HttpRequestMessage({ message, errorMessages }) {
    if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("the 'errorMessages' parameter is null, undefined or not of type: ErrorMessages");
    }
    const { contentType, contentLength, token } = message.getContentMetadata();
    const headers = { 'Content-Type': contentType, 'Content-Length': contentLength, 'Token': token || 'INVALID' };
    Object.defineProperty(this, 'getId', { writable: false, value: () => {
        return message.getId();
    }});
    Object.defineProperty(this, 'getHeaders', { writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getContent', { writable: false, value: () => {
        return message.getContent();
    }});
    Object.defineProperty(this, 'getContentType', { writable: false, value: () => {
        return headers['Content-Type'];
    }});
    Object.defineProperty(this, 'getContentLength', { writable: false, value: () => {
        return headers['Content-Length'];
    }});
    Object.defineProperty(this, 'getTimeout', { writable: false, value: () => {
        return message.getTimeout();
    }});
    Object.defineProperty(this, 'getFromHost', { writable: false, value: () => {
        return message.getFromHost();
    }});
    Object.defineProperty(this, 'validate', { writable: false, value: () => {
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
        if (!(this.getTimeout())) {
            throw new Error("http request message requires a timeout value");
        }
        if (errorMessages.hasErrors()) {
            throw(errorMessages.getLatest());
        }
    }});
};
HttpRequestMessage.prototype.getId = function() {};
HttpRequestMessage.prototype.getHeaders = function() {};
HttpRequestMessage.prototype.getContent = function() {};
HttpRequestMessage.prototype.getContentType = function() {};
HttpRequestMessage.prototype.getContentLength = function() {};
HttpRequestMessage.prototype.getTimeout = function() {};
HttpRequestMessage.prototype.getFromHost = () => {};
HttpRequestMessage.prototype.validate = function() {};
module.exports = { HttpRequestMessage };