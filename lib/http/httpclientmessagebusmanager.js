function HttpClientMessageBusManager({ httpClientMessageBusManagerMessageQueueBinding }) {
   const messageQueue = httpClientMessageBusManagerMessageQueueBinding.messageQueue;
    messageQueue.peekMessage({ queueName: httpClientStartedQueueName }).then(({ message }) => {
        if (message) {
            messageQueue.queueMessage({ message: {}, queueName: httpClientStopQueueName });
            messageQueue.dequeueMessage({ queueName: httpClientStoppedQueueName }).then(() => {
                messageQueueBinder.unbind({ queueName: httpClientRequestMessagesQueueName });
                messageQueueBinder.unbind({ queueName: httpClientResponseQueueName });
                messageQueue.queueMessage({ message: {}, queueName: httpClientStartQueueName });
            });
        } else {
            messageQueue.queueMessage({ message: {}, queueName: httpClientStartQueueName });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
