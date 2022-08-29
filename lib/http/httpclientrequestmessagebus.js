function HttpClientRequestMessageBus({ httpClientRequestMessageQueueBinding }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        httpClientRequestMessageQueueBinding.queueMessage({ message: httpRequestMessage });
    }});
};
HttpClientRequestMessageBus.prototype.publish = function({ httpRequestMessage }) { };
module.exports = { HttpClientRequestMessageBus };
