function HttpClientMessageQueue({ sharedMessageQueue, sharedMessageConverter, messageQueueContextId }) {
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');
    const { createEventSubscription } = require('../factory/eventsubscription.factory.js');
    const responseMessageQueueType = `${messageQueueContextId}_HttpClientResponses`;
    const requestMessageQueueType = `${messageQueueContextId}_HttpClientRequests`;
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 3, eventSource: 'HttpMessageBus', eventDescription: 'Http Message Bus Started' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
        }});
    }
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 9, eventSource: 'HttpMessageBus', eventDescription: 'Http Message Bus Stopped' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
        }});
    }
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: async ({ httpResponse }) => {
        const messageStatusCode = httpResponse.statusCode;
        const data = httpResponse.body;
        const { recipienthost, recipientport, senderhost, senderport, token } = httpResponse.headers;
        const metadata = httpResponse.headers;
        const { httpResponseMessage } = createHttpResponseMessage({ messageStatusCode, Id: null, data,
            recipientHost: recipienthost, recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport,
        });
        return await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpRequestMessage } = sharedMessageConverter.convertMessageToHttpRequestMessage({ message })
        return await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: requestMessageQueueType });
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
HttpClientMessageQueue.prototype.enqueueHttpResponse = async function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = async function({ message }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
module.exports = { HttpClientMessageQueue };
