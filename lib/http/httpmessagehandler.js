function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageHandlerQueue }) {
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await httpServerMessageQueue.open();
        await httpClientMessageQueue.open();
        await messageHandlerQueue.open();
        messageHandlerQueue.dequeueRequestMessage().then(async ({ message }) => {
            await httpClientMessageQueue.enqueueHttpRequestMessage({ message });
            const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
            await messageHandlerQueue.enqueueResponseMessage({ message: httpResponseMessage });
        });
        httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => { 
            messageHandlerQueue.enqueueRequestMessage({ message: httpRequestMessage });
            const { message } = await messageHandlerQueue.dequeueResponseMessage();
            await httpServerMessageQueue.enqueueHttpResponseMessage({ message });
        });
    }});
}
HttpMessageHandler.start = async function() {};
module.exports = { HttpMessageHandler };


