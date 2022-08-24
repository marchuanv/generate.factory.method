function HttpServerMessageBusManager({ scopeId, messageQueueBinder, messageQueue }) {
    const httpServerRequestsQueueName = `${scopeId}_httpserverrequests`;
    const httpServerResponseMessagesQueueName = `${scopeId}_httpserverresponsemessages`;
    const httpServerStartQueueName = 'httpserverstart';
    const httpServerStartedQueueName = 'httpserverstarted';
    const httpServerStopQueueName = 'httpserverstop';
    const httpServerStoppedQueueName = 'httpserverstopped';
    messageQueueBinder.bind({ queueName: httpServerStartQueueName });
    messageQueueBinder.bind({ queueName: httpServerStartedQueueName });
    messageQueueBinder.bind({ queueName: httpServerStopQueueName });
    messageQueueBinder.bind({ queueName: httpServerStoppedQueueName });
    messageQueue.peekMessage({ queueName: httpServerStartedQueueName }).then(({ message }) => {
        if (message) {
            messageQueue.queueMessage({ message: {}, queueName: httpServerStopQueueName });
            messageQueue.dequeueMessage({ queueName: httpServerStoppedQueueName }).then(() => {
                messageQueueBinder.unbind({ queueName: httpServerRequestsQueueName });
                messageQueueBinder.unbind({ queueName: httpServerResponseMessagesQueueName });
                messageQueue.queueMessage({ message: {}, queueName: httpServerStartQueueName });
            });
        } else {
            messageQueue.queueMessage({ message: {}, queueName: httpServerStartQueueName });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
