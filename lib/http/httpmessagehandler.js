function HttpMessageHandler({ httpServerMessageBus, httpClientMessageBus, messageHandlerQueue, sharedMessageConverter }) {
    
    //Client
    messageHandlerQueue.subscribeToRequestMessages({ callback: async ({ message }) => {
        const { httpRequestMessage } = sharedMessageConverter.convertMessageToHttpRequestMessage({ message });
        await httpClientMessageBus.publishHttpRequestMessage({ httpRequestMessage });
    }});
    httpClientMessageBus.subscribeToHttpResponseMessage({ callback: async ({ httpResponseMessage }) => {
        const { message } = sharedMessageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage });
        await messageHandlerQueue.publishResponseMessage({ message });
    }});

    //Server
    messageHandlerQueue.subscribeToResponseMessages({ callback: async ({ message }) => {
        const { httpResponseMessage } = sharedMessageConverter.convertMessageToHttpResponseMessage({ message });
        await httpServerMessageBus.publishHttpResponseMessage({ httpResponseMessage });
    }});
    httpServerMessageBus.subscribeToHttpRequestMessages({ callback: async ({ httpRequestMessage }) => {
        const { message } = sharedMessageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
        await messageHandlerQueue.publishRequestMessage({ message });
    }});
}
module.exports = { HttpMessageHandler };
