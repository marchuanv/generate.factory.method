const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, senderAddress, recipientAddress, channel, userId }) {
    const callbacks = [];
    const { recipientHost, recipientPort } = recipientAddress;
    const { senderHost, senderPort } = senderAddress;
    let loopId = null;
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        const { message } = createMessage({ recipientHost, recipientPort, Id: null,
            userId, data, senderHost, senderPort, token: null,
            metadata: { channel }, messageStatusCode: 2
        });
        await messageHandlerQueue.enqueueRequestMessage({ requestMessage: message });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.open();
        loopId = setInterval(async () => {
            const { requestMessage } = await messageHandlerQueue.dequeueRequestMessage();
            for(const callback of callbacks) {
                await callback({ requestMessage });
            };
            const { message } = createMessage({ 
                recipientHost, recipientPort, Id: null,
                userId, data:"subscribers notified", senderHost, senderPort, token: null,
                metadata: { channel }, messageStatusCode: 0
            });
            await messageHandlerQueue.enqueueResponseMessage({ responseMessage: message });
        },100);
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.close();
        clearInterval(loopId);
    }});
};
MessageBus.prototype.publish = function({ data }) { };
MessageBus.prototype.subscribe = async function({ callback }) { };
MessageBus.prototype.start = async function() { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
