function HttpClientResponseMessageBus({ httpClientResponseMessageQueueBinding, contextName }) {
    this.constructor({ httpClientResponseMessageQueueBinding, contextName  });
};
HttpClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpClientResponseMessageBus };
