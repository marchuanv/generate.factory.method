const { HttpRequestMessage } = require("./httprequestmessage");
const { HttpResponseMessage } = require("./httpresponsemessage");
const { MessageFactory } = require("../messagefactory");
const { MessageStatus } = require("../messagestatus");
const { Content } = require("../content");
function HttpMessageFactory({ messageFactory, encryption }) {
    if (!(messageFactory instanceof MessageFactory)) {
        throw new Error("the 'messageFactory' parameter is null, undefined or not of type: MessageFactory");
    }
    Object.defineProperty(this, 'createHttpRequestMessage', { writable: false, value: ({ address, data, headers  }) => {
        const content = new Content({ data, metadata: headers, encryption });
        const message = messageFactory.create({ fromHost, content, messageStatus: new MessageStatus({ code: 2 })});
        return new HttpRequestMessage({ message });
    }});
    Object.defineProperty(this, 'createHttpResponseMessage', { writable: false, value: ({ address, data, headers, messageStatus }) => {
        const content = new Content({ data, metadata: headers, encryption });
        const message = messageFactory.create({ fromHost, content, messageStatus });
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
HttpMessageFactory.prototype.createHttpRequestMessage = function({ address, data, headers }) {}
HttpMessageFactory.prototype.createHttpResponseMessage = function({ address, data, headers, messageStatus }) {}
HttpMessageFactory.prototype.convertHttpRequestMessageToMessage = function({ httpRequestMessage }) {}
HttpMessageFactory.prototype.convertHttpResponseMessageToMessage = function({ httpResponseMessage }) {}
HttpMessageFactory.prototype.convertMessageToHttpResponseMessage = function({ message }) {}
module.exports = { HttpMessageFactory };