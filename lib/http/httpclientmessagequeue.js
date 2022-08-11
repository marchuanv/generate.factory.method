function HttpClientMessageQueue({ sharedMessageQueue, sharedMessageConverter, messageQueueType, messageQueueContextId }) {
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');
    const responseMessageQueueType = `${messageQueueType.name}ClientResponse`;
    const requestMessageQueueType = `${messageQueueType.name}ClientRequest`;
    sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType, messageQueueContextId });
    sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType, messageQueueContextId });
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: async ({ httpResponse }) => {
        const messageStatusCode = httpResponse.statusCode;
        const data = httpResponse.body;
        const { recipienthost, recipientport, senderhost, senderport, token } = httpResponse.headers;
        const metadata = httpResponse.headers;
        const { httpResponseMessage } = createHttpResponseMessage({ messageStatusCode, Id: null, data,
            recipientHost: recipienthost, recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport,
        });
        return await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: responseMessageQueueType, messageQueueContextId});
    }});
    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpRequestMessage } = sharedMessageConverter.convertMessageToHttpRequestMessage({ message })
        return await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: requestMessageQueueType, messageQueueContextId });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType, messageQueueContextId });
        return { httpRequestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType, messageQueueContextId });
        return { httpResponseMessage: message, queueId };
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpResponse = async function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = async function({ message }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
module.exports = { HttpClientMessageQueue };