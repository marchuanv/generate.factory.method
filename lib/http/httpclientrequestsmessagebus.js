function HttpClientRequestsMessageBus({ messageQueue }) {
    const httpClientRequestMessagesQueueName = 'httpclientrequestmessages';
    messageQueue.bind({ queueName: httpClientRequestMessagesQueueName });
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        messageQueue.queueMessage({ message: httpRequestMessage, queueName: httpClientRequestMessagesQueueName });
    }});
};
HttpClientRequestsMessageBus.prototype.publish = function({ httpRequestMessage }) { };
module.exports = { HttpClientRequestsMessageBus };
