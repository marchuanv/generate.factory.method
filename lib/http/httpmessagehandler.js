function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageHandlerQueue }) {
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await httpServerMessageQueue.open();
        await httpClientMessageQueue.open();
        await messageHandlerQueue.open();
        messageHandlerQueue.dequeueRequestMessage().then(async ({ requestMessage }) => {
            await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage });
            const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
            await messageHandlerQueue.enqueueResponseMessage({ responseMessage: httpResponseMessage });
        });
        httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => { 
            messageHandlerQueue.enqueueRequestMessage({ requestMessage: httpRequestMessage });
            const { responseMessage } = await messageHandlerQueue.dequeueResponseMessage();
            await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage });
        });
    }});
}
HttpMessageHandler.start = async function() {};
module.exports = { HttpMessageHandler };


