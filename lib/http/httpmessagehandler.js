function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageQueue }) {
    Object.defineProperty(this, 'sendToQueue', { configurable: false, writable: false, value: async () => {
        const { requestMessage } = await messageQueue.dequeueRequestMessage();
        console.log('HttpMessageHandler: Queueing Request Message And Waiting For An Http Response...');
        await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage });
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
        await messageQueue.enqueueResponseMessage({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'receiveFromQueue', { configurable: false, writable: false, value: async () => {
        console.log('HttpMessageHandler: Waiting And DeQueuing Http Request Messages...');
        const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
        await messageQueue.enqueueRequestMessage({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'respondToQueue', { configurable: false, writable: false, value: async () => {
        const { responseMessage } = await messageQueue.dequeueResponseMessage();
        await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage });
    }});
}
HttpMessageHandler.prototype.sendToQueue = async function() { };
HttpMessageHandler.prototype.receiveFromQueue = function() { };
HttpMessageHandler.prototype.respondToQueue = function() { };
module.exports = { HttpMessageHandler };


