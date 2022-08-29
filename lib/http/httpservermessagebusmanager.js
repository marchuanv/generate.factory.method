function HttpServerMessageBusManager({ scopeId, httpServerRequestMessageQueueBinding, httpServerResponseMessageQueueBinding, httpServerStartMessageQueueBinding, httpServerStartedMessageQueueBinding, httpServerStopMessageQueueBinding, httpServerStoppedMessageQueueBinding }) {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const _message = message;
            httpServerStopMessageQueueBinding.queueMessage({ message: { scopeId: _message.scopeId } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (scopeId !== message.scopeId && _message.scopeId === message.scopeId) {
                    httpServerStartMessageQueueBinding.queueMessage({ message: { scopeId } });
                }
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: { scopeId } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpServerRequestMessageQueueBinding.unbind();
                httpServerResponseMessageQueueBinding.unbind();
            });
        }
    });
}
module.exports = { HttpServerMessageBusManager };


