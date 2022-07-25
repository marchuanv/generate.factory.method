function HttpClientMessageQueue({ sharedMessageQueue, messageQueueType, userId, senderAddress, recipientAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    sharedMessageQueue.register({  messageQueueType: `${messageQueueType.name}ClientResponse` });
    sharedMessageQueue.register({  messageQueueType: `${messageQueueType.name}ClientRequest` });
    
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
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: `${messageQueueType.name}ClientResponse` });
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
        const { queueId } = await sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: `${messageQueueType.name}ClientRequest` });
        return { queueId };
    }});

    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: `${messageQueueType.name}ClientRequest` });
        return { httpRequestMessage: message, queueId };
    }});
    
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: `${messageQueueType.name}ClientResponse`  });
        return { httpResponseMessage: message, queueId };
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpResponse = async function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = async function({ requestMessage }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };

module.exports = { HttpClientMessageQueue };