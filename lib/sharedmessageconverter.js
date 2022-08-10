function SharedMessageConverter() {
    
    const { createHttpResponseMessage } = require('./factory/httpresponsemessage.factory');
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');
    const { createMessage } = require('./factory/message.factory');
    const { createMessageStatus } = require('./factory/messagestatus.factory');

    Object.defineProperty(this, 'convertMessageToHttpRequestMessage', { configurable: false, writable: false, value: ({ message }) => {
        const Id = message.getId();
        const encryptedContent = message.getEncryptedContent();
        const { senderHost, senderPort } = message.getSenderAddress();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const metadata = message.getMessageMetadata();
        const { path, token } = metadata;
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        return createHttpRequestMessage({
            recipientHost, recipientPort, Id,
            data: encryptedContent, metadata, token,
            messageStatusCode, senderHost, senderPort, path
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
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
    Object.defineProperty(this, 'convertHttpRequestMessageToMessage', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        const messageStatusCode = 2;
        const Id = httpRequestMessage.getId();
        const data = httpRequestMessage.getEncryptedContent();
        const { recipientHost, recipientPort } = httpRequestMessage.getRecipientAddress();
        const metadata = httpRequestMessage.getMessageMetadata();
        const { token } = metadata;
        const { senderHost, senderPort } = httpRequestMessage.getSenderAddress();
        return createMessage({ 
            messageStatusCode, Id, data,
            recipientHost, recipientPort, metadata,
            token, senderHost, senderPort
        });
    }});
}
SharedMessageConverter.prototype.convertMessageToHttpRequestMessage = function({ message }) {};
SharedMessageConverter.prototype.convertMessageToHttpResponseMessage = function({ message }) {};
SharedMessageConverter.prototype.convertHttpRequestMessageToMessage = function({ httpRequestMessage }) {};
module.exports = { SharedMessageConverter };
