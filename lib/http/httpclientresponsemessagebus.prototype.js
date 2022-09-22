function HttpClientResponseMessageBus({ httpClientResponseMessageQueueBinding }) {
    this.constructor({ httpClientResponseMessageQueueBinding  });
};
HttpClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpClientResponseMessageBus };
