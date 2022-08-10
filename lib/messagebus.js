const utils = require("utils");
const { createMessage } = require("./factory/message.factory");

function MessageBus({ messageHandlerQueue, sharedUserSessions, channel, senderAddress, recipientAddress }) {
    const callbacks = [];
    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;
    let loopId = null;

    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ userId, secret, data }) => {
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        const { token } = userSecurity.authenticate({ secret });
        await messageHandlerQueue.enqueueRequestMessage(createMessage({  messageStatusCode: 2, Id: null, data, 
            recipientHost, recipientPort, metadata: { channel }, token, senderHost, senderPort
        }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.open();
        loopId = setInterval(async () => {
            const { message } = await messageHandlerQueue.dequeueResponseMessage();
            const { token, channel } = message.getMessageMetadata();
            const { userId } = utils.getJSONObject(utils.base64ToString(token)) || {};
            if (userId && channel) {
                for(const callback of callbacks) {
                    await callback({ message });
                };
                const { userSecurity } = sharedUserSessions.ensureSession({ userId });
                const { token } = userSecurity.getToken();
                await messageHandlerQueue.enqueueResponseMessage(createMessage({ messageStatusCode: 0, Id: null, data: "subscribers notified",
                    recipientHost, recipientPort, metadata: { channel }, token, senderHost, senderPort
                }));
            } else { // requeue message that was not for this user
                await messageHandlerQueue.enqueueRequestMessage({ message });
            }
        },100);
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: async () => {
        await messageHandlerQueue.close();
        clearInterval(loopId);
    }});
};
MessageBus.prototype.publish = function({ userId, data }) { };
MessageBus.prototype.subscribe = async function({ userId, callback }) { };
MessageBus.prototype.start = async function() { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
