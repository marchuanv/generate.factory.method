function HttpClientRequestMessageBus({ httpClientRequestMessageQueueBinding }) {
    this.constructor({ httpClientRequestMessageQueueBinding });
};
HttpClientRequestMessageBus.prototype.publish = function({ httpRequestMessage }) { };
module.exports = { HttpClientRequestMessageBus };
