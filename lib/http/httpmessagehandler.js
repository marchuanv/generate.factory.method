function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, sharedMessageQueue }) {
    Object.defineProperty(this, 'sendToQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (sendToQueue): Waiting For Request Message');
        const { requestMessage } = await sharedMessageQueue.dequeueRequestMessage();
        console.log('HttpMessageHandler (sendToQueue): Queueing Http Request Message');
        await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage });
        console.log('HttpMessageHandler (sendToQueue): Waiting For Http Response Message');
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
        await sharedMessageQueue.enqueueResponseMessage({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'receiveFromQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (receiveFromQueue): Waiting For Http Request Message');
        const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
        console.log('HttpMessageHandler (receiveFromQueue): Queueing Request Message');
        await sharedMessageQueue.enqueueRequestMessage({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'respondToQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (respondToQueue): Waiting For Response Message');
        const { responseMessage } = await sharedMessageQueue.dequeueResponseMessage();
        console.log('HttpMessageHandler (respondToQueue): Queueing Http Response Message');
        await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage });
    }});
}
HttpMessageHandler.prototype.sendToQueue = async function() { };
HttpMessageHandler.prototype.receiveFromQueue = function() { };
HttpMessageHandler.prototype.respondToQueue = function() { };
module.exports = { HttpMessageHandler };


