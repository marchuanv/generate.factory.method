const { HttpRequestMessage } = require("./httprequestmessage");
const { HttpResponseMessage } = require("./httpresponsemessage");
const { MessageFactory } = require("../messagefactory");
const { MessageStatus } = require("../messagestatus");
function HttpMessageFactory({ messageFactory }) {
    if (!(messageFactory instanceof MessageFactory)) {
        throw new Error("the 'messageFactory' parameter is null, undefined or not of type: MessageFactory");
    }
    Object.defineProperty(this, 'createHttpRequestMessage', { writable: false, value: ({ data, headers, messageStatus, method, path }) => {
        const metadata = { method, path };
        Object.assign(metadata, headers);

        const message = messageFactory.create({ data, metadata, messageStatus: messageStatus || new MessageStatus({ code: 2 })});
        return new HttpRequestMessage({ message });
    }});
    Object.defineProperty(this, 'createHttpResponseMessage', { writable: false, value: ({ data, headers, messageStatus }) => {
        const message = messageFactory.create({ data, metadata: headers, messageStatus: messageStatus || new MessageStatus({ code: 2 })});
        return new HttpResponseMessage({ message });
    }});
    Object.defineProperty(this, 'convertHttpRequestMessageToMessage', { writable: false, value: ({ httpRequestMessage }) => {
        const messageId = httpRequestMessage.getId();
        return messageFactory.get({ messageId });
    }});
    Object.defineProperty(this, 'convertHttpResponseMessageToMessage', { writable: false, value: ({ httpResponseMessage }) => {
        const messageId = httpResponseMessage.getId();
        return messageFactory.get({ messageId });
    }});
    Object.defineProperty(this, 'convertMessageToHttpResponseMessage', { writable: false, value: ({ message  }) => {
        return new HttpResponseMessage({ message });
    }});
}
HttpMessageFactory.prototype.createHttpRequestMessage = function({ data, headers, messageStatus, method, path }) {}
HttpMessageFactory.prototype.createHttpResponseMessage = function({ data, headers, messageStatus }) {}
HttpMessageFactory.prototype.convertHttpRequestMessageToMessage = function({ httpRequestMessage }) {}
HttpMessageFactory.prototype.convertHttpResponseMessageToMessage = function({ httpResponseMessage }) {}
HttpMessageFactory.prototype.convertMessageToHttpResponseMessage = function({ message }) {}
module.exports = { HttpMessageFactory };