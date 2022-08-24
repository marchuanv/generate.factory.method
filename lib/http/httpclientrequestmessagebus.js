function HttpClientRequestMessageBus({ scopeId, messageQueueBinder, messageQueue }) {
    const httpClientRequestMessagesQueueName = `${scopeId}_httpclientrequestmessages`;
    messageQueueBinder.bind({ queueName: httpClientRequestMessagesQueueName });
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        messageQueue.queueMessage({ message: httpRequestMessage, queueName: httpClientRequestMessagesQueueName });
    }});
};
HttpClientRequestMessageBus.prototype.publish = function({ httpRequestMessage }) { };
module.exports = { HttpClientRequestMessageBus };
