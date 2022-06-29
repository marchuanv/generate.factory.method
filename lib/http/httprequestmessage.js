const { Message } = require("../message");
const utils = require("utils");
function HttpRequestMessage({ message }) {
    if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
    }
    const { contentType, contentLength, token, sender, path } = message.getContentMetadata();
    const headers = { 'Content-Type': contentType, 'Content-Length': contentLength, 'Token': token || 'INVALID', 'SenderAddress': sender };
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
    Object.defineProperty(this, 'getSenderAddress', { writable: false, value: () => {
        return headers['SenderAddress'];
    }});
    Object.defineProperty(this, 'getPath', { writable: false, value: () => {
        return path;
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
        if (!(this.getSenderAddress())) {
            throw new Error("http response message requires a valid sender address");
        }
        if (!(this.getPath())) {
            throw new Error("http response message requires a valid path");
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