const { createMessage } = require("./factory/message.factory");
function MessageHandler({ httpMessageHandler, webSocketMessageHandler, sharedMessageQueue, senderAddress, userId, token }) {
    const handler = httpMessageHandler || webSocketMessageHandler;
    Object.defineProperty(this, 'sendToQueue', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        handler.sendToQueue();
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 2 });
        await sharedMessageQueue.enqueueRequestMessage({ message });
        return await sharedMessageQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receiveFromQueue', { configurable: false, writable: false, value: async () => {
        handler.receiveFromQueue();
        return await sharedMessageQueue.dequeueRequestMessage();
    }});
    Object.defineProperty(this, 'respondToQueue', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        handler.respondToQueue();
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 200 });
        await sharedMessageQueue.enqueueResponseMessage({ message });
    }});
}
MessageHandler.prototype.sendToQueue = async function({ data, metadata }) { };
MessageHandler.prototype.receiveFromQueue = function() { };
MessageHandler.prototype.respondToQueue = function({ data, metadata }) { };
module.exports = { MessageHandler };
