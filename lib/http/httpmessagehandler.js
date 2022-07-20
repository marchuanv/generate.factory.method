function HttpMessageHandler({ httpServerMessageQueue, httpClientMessageQueue, messageHandlerQueue }) {
    console.log('HttpMessageHandler: Waiting For Request Message');
    messageHandlerQueue.dequeueRequestMessage().then(({ requestMessage }) => {
        console.log('HttpMessageHandler (sendToQueue): Queueing Http Request Message');
        await httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage });
        console.log('HttpMessageHandler (sendToQueue): Waiting For Http Response Message');
        const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();
        await messageHandlerQueue.enqueueResponseMessage({ responseMessage: httpResponseMessage });
    });
    console.log('HttpMessageHandler: Waiting For Http Request Message');
    httpServerMessageQueue.dequeueHttpRequestMessage().then(({ httpRequestMessage }) => { 
        console.log('HttpMessageHandler (receiveFromQueue): Queueing Request Message');
        messageHandlerQueue.enqueueRequestMessage({ requestMessage: httpRequestMessage });
        console.log('HttpMessageHandler (respondToQueue): Waiting For Response Message');
        const { responseMessage } = await messageHandlerQueue.dequeueResponseMessage();
        console.log('HttpMessageHandler (respondToQueue): Queueing Http Response Message');
        await httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage });
    });
}
module.exports = { HttpMessageHandler };


