const utils = require('utils');
const { createHttpResponseMessage } = require('./factory/generated/httpresponsemessage/httpresponsemessage.factory');
const { createHttpRequestMessage } = require('./factory/generated/httprequestmessage/httprequestmessage.factory');
const { createMessage } = require('./factory/generated/message/message.factory');
const { MessageConverter } = require("./messageconverter.prototype");
MessageConverter.prototype.constructor = function() {
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
            factoryContainerBindingName: null,
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
            factoryContainerBindingName: null,
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
            factoryContainerBindingName: null,
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
            factoryContainerBindingName: null,
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
};
module.exports = { MessageConverter };
