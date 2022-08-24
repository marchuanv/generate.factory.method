function HttpClientMessageBusManager({ scopeId, messageQueueBinder, messageQueue }) {
    const httpClientRequestMessagesQueueName = `${scopeId}_httpclientrequestmessages`;
    const httpClientResponseQueueName = `${scopeId}_httpclientresponse`;
    const httpClientStartQueueName = 'httpclientstart';
    const httpClientStartedQueueName = 'httpclientstarted';
    const httpClientStopQueueName = 'httpclientstop';
    const httpClientStoppedQueueName = 'httpclientstopped';
    messageQueueBinder.bind({ queueName: httpClientRequestMessagesQueueName });
    messageQueueBinder.bind({ queueName: httpClientResponseQueueName });
    messageQueueBinder.bind({ queueName: httpClientStartQueueName });
    messageQueueBinder.bind({ queueName: httpClientStartedQueueName });
    messageQueueBinder.bind({ queueName: httpClientStopQueueName });
    messageQueueBinder.bind({ queueName: httpClientStoppedQueueName });
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
