function HttpClientMessageBusManager({ scopeId, httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding }) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.queueMessage({ message: { scopeId: message.scopeId } });
            httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
