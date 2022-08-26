function HttpServerMessageBusManager({ httpServerRequestMessageQueueBinding, httpServerResponseMessageQueueBinding, httpServerStartMessageQueueBinding, httpServerStartedMessageQueueBinding, httpServerStopMessageQueueBinding, httpServerStoppedMessageQueueBinding }) {
    httpServerStartedMessageQueueBinding.messageQueue.peekMessage().then(({ message }) => {
        if (message) {
            httpServerStopMessageQueueBinding.messageQueue.queueMessage({ message: {} });
            httpServerStoppedMessageQueueBinding.messageQueue.dequeueMessage().then(() => {
                httpServerRequestMessageQueueBinding.messageQueueBinder.unbind();
                httpServerResponseMessageQueueBinding.unbind();
                httpServerStartMessageQueueBinding.messageQueue.queueMessage({ message: {} });
            });
        } else {
            httpServerStartMessageQueueBinding.messageQueue.queueMessage({ message: {} });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
