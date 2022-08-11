const utils = require("utils");
function MessageBus({ messageHandlerQueue, sharedUserSessions, channel, token, senderAddress, recipientAddress }) {
    const { createMessage } = require("./factory/message.factory");
    const callbacks = [];
    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;
    let loopId = null;
    const { userId } = utils.getJSONObject(utils.base64ToString(token)) || {};
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => {
        await messageHandlerQueue.enqueueRequestMessage(createMessage({ 
            messageStatusCode: 2, Id: null, data, recipientHost, recipientPort,
            metadata: { channel }, token, senderHost, senderPort
        }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        callbacks.push(callback);
    }});
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: async () => {
        loopId = setInterval(async () => {
            const { message } = await messageHandlerQueue.dequeueResponseMessage();
            const { token, channel } = message.getMessageMetadata();
            if (userId && channel) {
                for(const callback of callbacks) {
                    await callback({ message });
                };
                const { userSecurity } = sharedUserSessions.ensureSession({ userId });
                const { token } = userSecurity.getToken();
                await messageHandlerQueue.enqueueResponseMessage(createMessage({ 
                    messageStatusCode: 0, Id: null, data: "subscribers notified", 
                    recipientHost, recipientPort, metadata: { channel }, token, senderHost, senderPort
                }));
            } else { // requeue message that was not for this user
                await messageHandlerQueue.enqueueRequestMessage({ message });
            }
        },100);
    }});
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: async () => {
        clearInterval(loopId);
    }});
};
MessageBus.prototype.publish = function({ userId, data }) { };
MessageBus.prototype.subscribe = async function({ userId, callback }) { };
MessageBus.prototype.start = async function() { };
MessageBus.prototype.stop = async function() { };
module.exports = { MessageBus };
