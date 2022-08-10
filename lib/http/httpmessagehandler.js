function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageHandlerQueue }) {
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
}
module.exports = { HttpMessageHandler };
