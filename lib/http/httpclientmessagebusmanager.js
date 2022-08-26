function HttpClientMessageBusManager({  httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding }) {
   httpClientStartedMessageQueueBinding.messageQueue.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.messageQueue.queueMessage({ message: {} });
            httpClientStoppedMessageQueueBinding.messageQueue.dequeueMessage().then(() => {
                httpClientRequestMessageQueueBinding.messageQueue.unbind();
                httpClientResponseMessageQueueBinding.messageQueue.unbind();
                httpClientStartMessageQueueBinding.messageQueue.queueMessage({ message: {} });
            });
        } else {
            httpClientStartMessageQueueBinding.messageQueue.queueMessage({ message: {} });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
