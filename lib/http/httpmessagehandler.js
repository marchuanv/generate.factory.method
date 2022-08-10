function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageHandlerQueue, sharedMessageConverter }) {
    messageHandlerQueue.dequeueRequestMessage().then(async ({ message }) => {
        await httpClientMessageQueue.enqueueHttpRequestMessage({ message });
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
        await messageHandlerQueue.enqueueResponseMessage({ message: httpResponseMessage });
    });
    httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => { 
        {
            const { message } = sharedMessageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
            messageHandlerQueue.enqueueRequestMessage({ message });
        }
        {
            const { message } = await messageHandlerQueue.dequeueResponseMessage();
            await httpServerMessageQueue.enqueueHttpResponseMessage({ message });
        }
    });
}
module.exports = { HttpMessageHandler };
