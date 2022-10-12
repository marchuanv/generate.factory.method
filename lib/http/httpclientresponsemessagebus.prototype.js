function HttpClientResponseMessageBus({ httpClientResponseMessageQueueBinding, factoryContainerBindingName }) {
    this.constructor({ httpClientResponseMessageQueueBinding, factoryContainerBindingName  });
};
HttpClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpClientResponseMessageBus };
