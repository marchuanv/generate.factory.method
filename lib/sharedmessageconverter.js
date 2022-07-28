function SharedMessageConverter() {
    const { createHttpResponseMessage } = require('./factory/httpresponsemessage.factory');
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');
    Object.defineProperty(this, 'convertMessageToHttpRequestMessage', { configurable: false, writable: false, value: ({ message }) => {
        const Id = message.getId();
        const encryptedContent = message.getEncryptedContent();
        const { senderHost, senderPort } = message.getSenderAddress();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const metadata = message.getMessageMetadata();
        const { path } = metadata;
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        return createHttpRequestMessage({
            recipientHost, recipientPort, Id,
            data: encryptedContent, metadata,
            messageStatusCode, senderHost, senderPort, path
        });
    }});
    Object.defineProperty(this, 'convertMessageToHttpResponseMessage', { configurable: false, writable: false, value: ({ message }) => {
        const Id = message.getId();
        const encryptedContent = message.getEncryptedContent();
        const { senderHost, senderPort } = message.getSenderAddress();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const { userId } = message.getMessageMetadata();
        const metadata = message.getMessageMetadata();
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        return createHttpResponseMessage({
            recipientHost, recipientPort, Id,
            data: encryptedContent, userId, metadata,
            messageStatusCode, senderHost, senderPort
        });
    }});
}
SharedMessageConverter.prototype.convertMessageToHttpRequestMessage = function({ message }) {};
SharedMessageConverter.prototype.convertMessageToHttpResponseMessage = function({ message }) {};
module.exports = { SharedMessageConverter };
