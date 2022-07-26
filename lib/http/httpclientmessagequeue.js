function HttpClientMessageQueue({ sharedMessageQueue, messageQueueType, userId, senderAddress, recipientAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    const responseMessageQueueType = `${messageQueueType.name}ClientResponse`;
    const requestMessageQueueType = `${messageQueueType.name}ClientRequest`;

    sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
    sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
    
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: async ({ httpResponse }) => {
        const data = httpResponse.body;
        const { token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const metadata = httpResponse.headers;
        const { httpResponseMessage } = createHttpResponseMessage({
            recipientHost, recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode
        });
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: responseMessageQueueType });
        return { queueId };
    }});

    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        const { path, method } = requestMessage.getContentMetadata();
        const data = requestMessage.getContent();
        const token = requestMessage.getToken();
        const { code } = requestMessage.getMessageStatus();
        const messageStatusCode = code;
        const Id = requestMessage.getId();
        const { httpRequestMessage } = createHttpRequestMessage({ 
            method, recipientHost, recipientPort, Id,
            userId, data, senderHost, senderPort,
            token, metadata: {}, messageStatusCode, path
        });
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: requestMessageQueueType });
        return { queueId };
    }});

    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType });
        return { httpRequestMessage: message, queueId };
    }});
    
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType });
        return { httpResponseMessage: message, queueId };
    }});

    Object.defineProperty(this, 'close', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpResponse = async function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = async function({ requestMessage }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
HttpClientMessageQueue.prototype.close = async function () { };

module.exports = { HttpClientMessageQueue };