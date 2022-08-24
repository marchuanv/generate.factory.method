function HttpServerMessageBusManager({ scopeId, messageQueue }) {
    const httpServerRequestsQueueName = `${scopeId}_httpserverrequests`;
    const httpServerResponseMessagesQueueName = `${scopeId}_httpserverresponsemessages`;
    const httpServerStartQueueName = 'httpserverstart';
    const httpServerStartedQueueName = 'httpserverstarted';
    const httpServerStopQueueName = 'httpserverstop';
    const httpServerStoppedQueueName = 'httpserverstopped';
    messageQueue.bind({ queueName: httpServerStartQueueName });
    messageQueue.bind({ queueName: httpServerStartedQueueName });
    messageQueue.bind({ queueName: httpServerStopQueueName });
    messageQueue.bind({ queueName: httpServerStoppedQueueName });
    messageQueue.peekMessage({ queueName: httpServerStartedQueueName }).then(({ message }) => {
        if (message) {
            messageQueue.queueMessage({ message: {}, queueName: httpServerStopQueueName });
            messageQueue.dequeueMessage({ queueName: httpServerStoppedQueueName }).then(() => {
                messageQueue.unbind({ queueName: httpServerRequestsQueueName });
                messageQueue.unbind({ queueName: httpServerResponseMessagesQueueName });
                messageQueue.queueMessage({ message: {}, queueName: httpServerStartQueueName });
            });
        } else {
            messageQueue.queueMessage({ message: {}, queueName: httpServerStartQueueName });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
