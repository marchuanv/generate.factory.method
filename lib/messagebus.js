const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, senderAddress, recipientAddress, channel, userId }) {
    const callbacks = [];
    const { recipientHost, recipientPort } = recipientAddress;
    const { senderHost, senderPort } = senderAddress;
    let loopId = null;
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        await messageHandlerQueue.enqueueRequestMessage(createMessage({  messageStatusCode: 2, Id: null, data, 
            recipientHost, recipientPort, metadata: { userId, channel }, senderHost, senderPort
        }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.open();
        loopId = setInterval(async () => {
            {
                const { message } = await messageHandlerQueue.dequeueRequestMessage();
                for(const callback of callbacks) {
                    await callback({ message });
                };
            }
            {
                await messageHandlerQueue.enqueueResponseMessage(createMessage({ messageStatusCode: 0, Id: null, data: "subscribers notified",
                    recipientHost, recipientPort, metadata: { channel, userId, secret }, senderHost, senderPort
                }));
            }
        },100);
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.close();
        clearInterval(loopId);
    }});
};
MessageBus.prototype.publish = function({ data }) { };
MessageBus.prototype.subscribe = async function({ callback }) { };
MessageBus.prototype.start = async function({ userId, secret }) { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
