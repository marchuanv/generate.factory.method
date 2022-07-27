function HttpClientMessageQueue({ sharedMessageQueue, sharedMessageConverter, messageQueueType }) {
    
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const responseMessageQueueType = `${messageQueueType.name}ClientResponse`;
    const requestMessageQueueType = `${messageQueueType.name}ClientRequest`;

    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
    }});
    
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: async ({ httpResponse }) => {
        const data = httpResponse.body;
        const { token, base64rsapublickey } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const metadata = httpResponse.headers;
        const { httpResponseMessage } = createHttpResponseMessage({
            recipientHost, recipientPort,
            userId, remoteBase64RSAPublicKey: base64rsapublickey, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode
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

    Object.defineProperty(this, 'close', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpResponse = async function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = async function({ message }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
HttpClientMessageQueue.prototype.close = async function () { };
HttpClientMessageQueue.prototype.open = async function () { };
module.exports = { HttpClientMessageQueue };