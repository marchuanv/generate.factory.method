function HttpServerMessageQueue({ sharedMessageQueue, sharedMessageConverter, messageQueueType }) {

    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');

    const responseMessageQueueType = `${messageQueueType.name}ServerResponse`;
    const requestMessageQueueType = `${messageQueueType.name}ServerRequest`;

    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.bind({  messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.bind({  messageQueueType: requestMessageQueueType });
    }});

    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: async ({ httpRequest }) => {
        const data = httpRequest.body;
        const { token, base64rsapublickey, senderHost, senderPort } = httpRequest.headers;
        const { path, method } = httpRequest;
        const metadata = httpRequest.headers;
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({
            method,
            recipientHost, recipientPort,
            userId, remoteBase64RSAPublicKey: base64rsapublickey, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode,
            path
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

    Object.defineProperty(this, 'close', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = async function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = async function({ message }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = async function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = async function () { };
HttpServerMessageQueue.prototype.close = function () { };
HttpServerMessageQueue.prototype.open = function () { };
module.exports = { HttpServerMessageQueue };