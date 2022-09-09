const utils = require('utils');
const { createHttpResponseMessage } = require('./factory/httpresponsemessage.factory');
const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');
const { createMessage } = require('./factory/message.factory');

function MessageConverter() {
    Object.defineProperty(this, 'convertMessageToHttpRequestMessage', { configurable: false, writable: false, value: ({ message }) => {
        const Id = message.getId();
        const encryptedContent = message.getEncryptedContent();
        const { senderHost, senderPort } = message.getSenderAddress();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const metadata = message.getMessageMetadata();
        const { token } = metadata;
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        return createHttpRequestMessage({ 
            scopeId: utils.generateGUID(),
            messageStatusCode, Id,  data: encryptedContent, recipientHost,
            recipientPort, metadata, token, senderHost, senderPort
        });
    }});
    Object.defineProperty(this, 'convertMessageToHttpResponseMessage', { configurable: false, writable: false, value: ({ message }) => {
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        const Id = message.getId();
        const data = message.getEncryptedContent();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const metadata = message.getMessageMetadata();
        const { token } = metadata;
        const { senderHost, senderPort } = message.getSenderAddress();
        return createHttpResponseMessage({ 
            scopeId: utils.generateGUID(),
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
    Object.defineProperty(this, 'convertHttpRequestMessageToMessage', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        const { code } = httpRequestMessage.getMessageStatus();
        const messageStatusCode = code;
        const Id = httpRequestMessage.getId();
        const data = httpRequestMessage.getEncryptedContent();
        const { recipientHost, recipientPort } = httpRequestMessage.getRecipientAddress();
        const metadata = httpRequestMessage.getMessageMetadata();
        const { token } = metadata;
        const { senderHost, senderPort } = httpRequestMessage.getSenderAddress();
        return createMessage({ 
            scopeId: utils.generateGUID(),
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
    Object.defineProperty(this, 'convertHttpResponseMessageToMessage', { configurable: false, writable: false, value: ({ httpResponseMessage }) => {
        const { code } = httpResponseMessage.getMessageStatus();
        const messageStatusCode = code;
        const Id = httpResponseMessage.getId();
        const data = httpResponseMessage.getEncryptedContent();
        const { recipientHost, recipientPort } = httpResponseMessage.getRecipientAddress();
        const metadata = httpResponseMessage.getMessageMetadata();
        const { token } = metadata;
        const { senderHost, senderPort } = httpResponseMessage.getSenderAddress();
        return createMessage({ 
            scopeId: utils.generateGUID(),
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
}
MessageConverter.prototype.convertMessageToHttpRequestMessage = function({ message }) {};
MessageConverter.prototype.convertMessageToHttpResponseMessage = function({ message }) {};
MessageConverter.prototype.convertHttpRequestMessageToMessage = function({ httpRequestMessage }) {};
MessageConverter.prototype.convertHttpResponseMessageToMessage = function({ httpResponseMessage }) {};
module.exports = { MessageConverter };
