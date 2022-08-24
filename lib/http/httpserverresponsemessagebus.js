function HttpServerResponseMessageBus({ scopeId, messageQueue }) {
    const httpServerResponseMessagesQueueName = `${scopeId}_httpserverresponsemessages`;
    messageQueue.bind({ queueName: httpServerResponseMessagesQueueName });
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ httpResponseMessage }) => {
        await messageQueue.queueMessage({ message: httpResponseMessage, queueName: httpServerResponseMessagesQueueName });
    }});
};
HttpServerResponseMessageBus.prototype.publish = async function({ httpResponseMessage }) { };
module.exports = { HttpServerResponseMessageBus };
