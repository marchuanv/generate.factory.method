const utils = require('utils');

function HttpServerMessageQueue({ sharedMessageQueue, messageQueueType, userId, senderAddress, recipientAddress }) {

    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    sharedMessageQueue.register({  messageQueueType: `${messageQueueType.name}ServerRequest` });
    sharedMessageQueue.register({  messageQueueType: `${messageQueueType.name}ServerResponse` });

    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: async ({ httpRequest }) => {
        const data = httpRequest.body;
        const { token } = httpRequest.headers;
        const { path, method } = httpRequest;
        const metadata = httpRequest.headers;
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({
            method,
            recipientHost, recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode,
            path
        });
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: `${messageQueueType.name}ServerRequest`  });
        return { queueId };
    }});
    Object.defineProperty(this, 'enqueueHttpResponseMessage', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        const { senderHost, senderPort } = responseMessage.getSenderAddress();
        const token = responseMessage.getToken();
        const data = responseMessage.getContent();
        const { code } = responseMessage.getMessageStatus();
        const metadata = responseMessage.getContentMetadata();
        const messageStatusCode = code;
        const Id = responseMessage.getId();
        const { httpResponseMessage } = createHttpResponseMessage({
            recipientHost, recipientPort, Id,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode
        });
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: `${messageQueueType.name}ServerResponse` });
        return { queueId };
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: `${messageQueueType.name}ServerRequest` });
        return { httpRequestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: `${messageQueueType.name}ServerResponse` });
        return { httpResponseMessage: message, queueId };
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = async function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = async function({ responseMessage }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };

module.exports = { HttpServerMessageQueue };