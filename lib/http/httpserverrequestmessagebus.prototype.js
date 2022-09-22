function HttpServerRequestMessageBus({ httpServerRequestMessageQueueBinding }) {
    this.constructor({ httpServerRequestMessageQueueBinding });
};
HttpServerRequestMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpServerRequestMessageBus };
