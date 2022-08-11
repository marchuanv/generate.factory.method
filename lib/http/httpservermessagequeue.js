function HttpServerMessageQueue({ sharedMessageQueue, sharedMessageConverter, messageQueueContextId }) {
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createEventSubscription } = require('../factory/eventsubscription.factory.js');
    const responseMessageQueueType = `${messageQueueContextId}_HttpServerResponses`;
    const requestMessageQueueType = `${messageQueueContextId}_HttpServerRequests`;
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 3, eventSource: 'HttpServerMessageQueue', eventDescription: 'Http Message Bus Started' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
        }});
    }
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 9, eventSource: 'HttpServerMessageQueue', eventDescription: 'Http Message Bus Stopped' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
        }});
    }
    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: async ({ httpRequest }) => {
        const data = httpRequest.body;
        const { recipienthost, recipientport, senderhost, senderport, token } = httpRequest.headers;
        const metadata = httpRequest.headers;
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({ messageStatusCode, Id: null, data, recipientHost: recipienthost,
            recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport
        });
        return await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: requestMessageQueueType });
    }});
    Object.defineProperty(this, 'enqueueHttpResponseMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpResponseMessage } = sharedMessageConverter.convertMessageToHttpResponseMessage({ message });
        return await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType });
        return { httpRequestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType });
        return { httpResponseMessage: message, queueId };
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = async function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = async function({ message }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
module.exports = { HttpServerMessageQueue };