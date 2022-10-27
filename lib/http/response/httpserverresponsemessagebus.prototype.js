function HttpServerResponseMessageBus({ httpServerResponseMessageQueueBinding }) {
    this.constructor({ httpServerResponseMessageQueueBinding });
};
HttpServerResponseMessageBus.prototype.publish = async function({ httpResponseMessage }) { };
module.exports = { HttpServerResponseMessageBus };
