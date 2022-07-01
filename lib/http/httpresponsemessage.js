const { Message } = require("../message");
const utils = require("utils");
function HttpResponseMessage({ message }) {
    if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is undefined, null or not of type: Message");
    }
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
        return code === 0 ? 200 : code === 1 ? 500 : code === 3 ? 400: 404;
    }});
    Object.defineProperty(this, 'getStatusMessage', { configurable: false, writable: false, value: () => {
        const { code } = message.getMessageStatus();
        return code === 0 ? 'Success' : code === 1 ? 'Internal Server Error' : code === 3 ? 'Bad Request': 'Not Found';
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
    Object.defineProperty(this, 'getRecipientAddress', { configurable: false, writable: false, value: () => {
        return message.getRecipientAddress();
    }});
    Object.defineProperty(this, 'validate', { configurable: false, writable: false, value: () => {
        if (!(this.getId())) {
            throw new Error("http response message requires a valid id");
        }
        if (!(this.getHeaders())) {
            throw new Error("http response message requires a valid response headers");
        }
        if (!this.getStatusCode()) {
            throw new Error("http response message requires an http status code");
        }
        if (!this.getStatusMessage()) {
            throw new Error("http response message requires an http status message");
        }
        if (!(this.getContent())) {
            throw new Error("http response message requires valid content");
        }
        if (!(this.getContentType())) {
            throw new Error("http response message requires a valid content type");
        }
        if (!(this.getContentLength())) {
            throw new Error("http response message requires valid content length");
        }
        if (!(this.getRecipientAddress())) {
            throw new Error("http response message requires a valid recipient adress");
        }
    }});
};
HttpResponseMessage.prototype.getId = function() {};
HttpResponseMessage.prototype.getHeaders = function() {};
HttpResponseMessage.prototype.getStatusCode = () => {};
HttpResponseMessage.prototype.getStatusMessage = () => {};
HttpResponseMessage.prototype.getContent = () => {};
HttpResponseMessage.prototype.getContentType = () => {};
HttpResponseMessage.prototype.getContentLength = () => {};
HttpResponseMessage.prototype.getRecipientAddress = () => {};
HttpResponseMessage.prototype.validate = () => {};
module.exports = { HttpResponseMessage };