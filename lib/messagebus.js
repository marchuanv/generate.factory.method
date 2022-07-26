const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, senderAddress, recipientAddress, channel, userId }) {
    const callbacks = [];
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        const { recipientHost, recipientPort } = recipientAddress;
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ 
            recipientHost, recipientPort, Id: null,
            userId, data, senderHost, senderPort, token: null,
            metadata: { channel }, messageStatusCode: 2
        });
        await messageHandlerQueue.enqueueRequestMessage({ requestMessage: message });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        callbacks.push({ callback });
    }});
    setInterval(async () => {
        const { message } = await messageHandlerQueue.dequeueRequestMessage();
        for(const callback of callbacks) {
            await callback({ message });
        };
        {
            const { message } = createMessage({ 
                recipientHost, recipientPort, Id: null,
                userId, data:"subscribers notified", senderHost, senderPort, token: null,
                metadata: { channel }, messageStatusCode: 0
            });
            await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
        }
    },100);
};
MessageBus.prototype.publish = function({ data }) {};
MessageBus.prototype.subscribe = async function({ callback }) {};
module.exports = { MessageBus };
