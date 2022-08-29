function HttpServerMessageBusManager({ httpServerRequestMessageQueueBinding, httpServerResponseMessageQueueBinding, httpServerStartMessageQueueBinding, httpServerStartedMessageQueueBinding, httpServerStopMessageQueueBinding, httpServerStoppedMessageQueueBinding }) {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpServerStopMessageQueueBinding.queueMessage({ message: {} });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpServerStoppedMessageQueueBinding.queueMessage({ message: { } });
                httpServerStartMessageQueueBinding.queueMessage({ message: { } });
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: {} });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpServerRequestMessageQueueBinding.unbind();
                httpServerResponseMessageQueueBinding.unbind();
            });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
