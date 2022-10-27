function HttpServerRequestMessageBus({ httpServerRequestMessageQueueBinding, contextName }) {
    this.constructor({ httpServerRequestMessageQueueBinding, contextName });
};
HttpServerRequestMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpServerRequestMessageBus };
