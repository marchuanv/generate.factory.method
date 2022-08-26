function HttpServerResponseMessageBus({httpServerResponseMessageQueueBinding }) {

    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ httpResponseMessage }) => {
        await httpServerResponseMessageQueueBinding.messageQueue.queueMessage({ message: httpResponseMessage });
    }});
};
HttpServerResponseMessageBus.prototype.publish = async function({ httpResponseMessage }) { };
module.exports = { HttpServerResponseMessageBus };
