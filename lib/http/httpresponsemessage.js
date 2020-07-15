const { Message } = require("../message");
const { ErrorMessages } = require("../errormessages");
const utils = require("utils");
function HttpResponseMessage({ message, errorMessages }) {
    if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is undefined, null or not of type: Message");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("'errorMessages' parameter is undefined, null or not of type: ErrorMessages");
    }
    const { contentType, contentLength, token } = message.getContentMetadata();
    const headers = {
        'Content-Type': contentType,
        'Content-Length': contentLength,
        'Token': token || 'INVALID'
    };
    Object.defineProperty(this, 'getId', { writable: false, value: () => {
        return message.getId();
    }});
    Object.defineProperty(this, 'getHeaders', { writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(headers)); //clone
    }});
    Object.defineProperty(this, 'getStatusCode', { writable: false, value: () => {
        const { code } = message.getMessageStatus();
        return code === 0 ? 200 : code === 1 ? 500 : code === 3 ? 400: 404;
    }});
    Object.defineProperty(this, 'getStatusMessage', { writable: false, value: () => {
        const { code } = message.getMessageStatus();
        return code === 0 ? 'Success' : code === 1 ? 'Internal Server Error' : code === 3 ? 'Bad Request': 'Not Found';
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
    Object.defineProperty(this, 'getFromHost', { writable: false, value: () => {
        return message.getFromHost();
    }});
    Object.defineProperty(this, 'validate', { writable: false, value: () => {
        if (!(this.getId())) {
            errorMessages.add(new Error("http response message requires a valid id"));
        }
        if (!(this.getHeaders())) {
            errorMessages.add(new Error("http response message requires a valid response headers"));
        }
        if (!this.getStatusCode()) {
            errorMessages.add(new Error("http response message requires an http status code"));
        }
        if (!this.getStatusMessage()) {
            errorMessages.add(new Error("http response message requires an http status message"));
        }
        if (!(this.getContent())) {
            errorMessages.add(new Error("http response message requires valid content"));
        }
        if (!(this.getContentType())) {
            errorMessages.add(new Error("http response message requires a valid content type"));
        }
        if (!(this.getContentLength())) {
            errorMessages.add(new Error("http response message requires valid content length"));
        }
        if (errorMessages.hasErrors()) {
            throw(errorMessages.getLatest());
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
HttpResponseMessage.prototype.getFromHost = () => {};
HttpResponseMessage.prototype.validate = () => {};
module.exports = { HttpResponseMessage };