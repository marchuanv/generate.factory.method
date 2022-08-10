const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, senderAddress, recipientAddress, channel, userId, secret }) {
    const callbacks = [];
    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;
    let loopId = null;
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        await messageHandlerQueue.enqueueRequestMessage(createMessage({  messageStatusCode: 2, Id: null, data, 
            recipientHost, recipientPort, metadata: { channel }, userId, senderHost, senderPort
        }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.open();
        loopId = setInterval(async () => {
            {
                const currentUser = userId;
                const currentChannel = channel;
                const { message } = await messageHandlerQueue.dequeueRequestMessage();
                const { userId, channel } = message.getMessageMetadata();
                if (currentUser === userId && currentChannel === channel) {
                    for(const callback of callbacks) {
                        await callback({ message });
                    };
                    await messageHandlerQueue.enqueueResponseMessage(createMessage({ messageStatusCode: 0, Id: null, data: "subscribers notified",
                        recipientHost, recipientPort, metadata: { channel, userId, secret }, senderHost, senderPort
                    }));
                } else { // requeue message that was not for this user
                    await messageHandlerQueue.enqueueRequestMessage({ message });
                }
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
MessageBus.prototype.start = async function() { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
