function HttpClientMessageBusManager({ httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding }) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.queueMessage({ message: {} });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpClientStoppedMessageQueueBinding.queueMessage({ message: {} });
                httpClientStartMessageQueueBinding.queueMessage({ message: {} });
            });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: {} });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpClientRequestMessageQueueBinding.unbind();
                httpClientResponseMessageQueueBinding.unbind();
            });
        }
    });
    
}
module.exports = { HttpClientMessageBusManager };
