function HttpClientMessageBusManager({ scopeId, messageQueue }) {
    const httpClientRequestMessagesQueueName = `${scopeId}_httpclientrequestmessages`;
    const httpClientResponseQueueName = `${scopeId}_httpclientresponse`;
    const httpClientStartQueueName = 'httpclientstart';
    const httpClientStartedQueueName = 'httpclientstarted';
    const httpClientStopQueueName = 'httpclientstop';
    const httpClientStoppedQueueName = 'httpclientstopped';
    messageQueue.bind({ queueName: httpClientRequestMessagesQueueName });
    messageQueue.bind({ queueName: httpClientResponseQueueName });
    messageQueue.bind({ queueName: httpClientStartQueueName });
    messageQueue.bind({ queueName: httpClientStartedQueueName });
    messageQueue.bind({ queueName: httpClientStopQueueName });
    messageQueue.bind({ queueName: httpClientStoppedQueueName });
    messageQueue.peekMessage({ queueName: httpClientStartedQueueName }).then(({ message }) => {
        if (message) {
            messageQueue.queueMessage({ message: {}, queueName: httpClientStopQueueName });
            messageQueue.dequeueMessage({ queueName: httpClientStoppedQueueName }).then(() => {
                messageQueue.unbind({ queueName: httpClientRequestMessagesQueueName });
                messageQueue.unbind({ queueName: httpClientResponseQueueName });
                messageQueue.queueMessage({ message: {}, queueName: httpClientStartQueueName });
            });
        } else {
            messageQueue.queueMessage({ message: {}, queueName: httpClientStartQueueName });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
