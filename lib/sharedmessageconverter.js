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
        const { code } = message.getMessageStatus();
        const messageStatusCode = code;
        const Id = message.getId();
        const data = message.getEncryptedContent();
        const { recipientHost, recipientPort } = message.getRecipientAddress();
        const metadata = message.getMessageMetadata();
        const { senderHost, senderPort } = message.getSenderAddress();
        return createHttpResponseMessage({ messageStatusCode, Id, data, recipientHost, recipientPort, metadata, senderHost, senderPort});
    }});
}
SharedMessageConverter.prototype.convertMessageToHttpRequestMessage = function({ message }) {};
SharedMessageConverter.prototype.convertMessageToHttpResponseMessage = function({ message }) {};
module.exports = { SharedMessageConverter };
