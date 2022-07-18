function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageQueue }) {
    Object.defineProperty(this, 'sendToQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (sendToQueue): Waiting For Request Message');
        const { requestMessage } = await messageQueue.dequeueRequestMessage();
        console.log('HttpMessageHandler (sendToQueue): Queueing Http Request Message');
        await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage });
        console.log('HttpMessageHandler (sendToQueue): Waiting For Http Response Message');
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
        await messageQueue.enqueueResponseMessage({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'receiveFromQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (receiveFromQueue): Waiting For Http Request Message');
        const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
        console.log('HttpMessageHandler (receiveFromQueue): Queueing Request Message');
        await messageQueue.enqueueRequestMessage({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'respondToQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler (respondToQueue): Waiting For Response Message');
        const { responseMessage } = await messageQueue.dequeueResponseMessage();
        console.log('HttpMessageHandler (respondToQueue): Queueing Http Response Message');
        await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage });
    }});
}
HttpMessageHandler.prototype.sendToQueue = async function() { };
HttpMessageHandler.prototype.receiveFromQueue = function() { };
HttpMessageHandler.prototype.respondToQueue = function() { };
module.exports = { HttpMessageHandler };


