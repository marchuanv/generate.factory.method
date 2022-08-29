function HttpServerMessageBusManager({ httpServerRequestMessageQueueBinding, httpServerResponseMessageQueueBinding, httpServerStartMessageQueueBinding, httpServerStartedMessageQueueBinding, httpServerStopMessageQueueBinding, httpServerStoppedMessageQueueBinding }) {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpServerStopMessageQueueBinding.queueMessage({ message: {} });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(() => {
                httpServerRequestMessageQueueBinding.unbind();
                httpServerResponseMessageQueueBinding.unbind();
                httpServerStartMessageQueueBinding.queueMessage({ message: {} });
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: {} });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
