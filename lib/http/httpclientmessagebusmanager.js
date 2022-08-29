function HttpClientMessageBusManager({ scopeId, httpClientRequestMessageQueueBinding, httpClientResponseMessageQueueBinding, httpClientStartMessageQueueBinding, httpClientStartedMessageQueueBinding, httpClientStopMessageQueueBinding, httpClientStoppedMessageQueueBinding }) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const _message = message;
            httpClientStopMessageQueueBinding.queueMessage({ message: { scopeId: _message.scopeId } });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (scopeId !== message.scopeId && _message.scopeId === message.scopeId) {
                    httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
                }
            });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpClientRequestMessageQueueBinding.unbind();
                httpClientResponseMessageQueueBinding.unbind();
            });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
