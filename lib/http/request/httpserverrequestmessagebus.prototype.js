function HttpServerRequestMessageBus({ httpServerRequestMessageQueueBinding, factoryContainerBindingName }) {
    this.constructor({ httpServerRequestMessageQueueBinding, factoryContainerBindingName });
};
HttpServerRequestMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpServerRequestMessageBus };
