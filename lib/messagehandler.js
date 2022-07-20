const { createMessage } = require("./factory/message.factory");
function MessageHandler({ httpMessageHandler, webSocketMessageHandler, messageHandlerQueue, senderAddress, userId, token }) {
    const handler = httpMessageHandler || webSocketMessageHandler;
    Object.defineProperty(this, 'sendToQueue', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        handler.sendToQueue();
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 2 });
        await messageHandlerQueue.enqueueRequestMessage({ message });
        return await messageHandlerQueue.dequeueResponseMessage();
    }});
    Object.defineProperty(this, 'receiveFromQueue', { configurable: false, writable: false, value: async () => {
        handler.receiveFromQueue();
        return await messageHandlerQueue.dequeueRequestMessage();
    }});
    Object.defineProperty(this, 'respondToQueue', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        handler.respondToQueue();
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 200 });
        await messageHandlerQueue.enqueueResponseMessage({ message });
    }});
}
MessageHandler.prototype.sendToQueue = async function({ data, metadata }) { };
MessageHandler.prototype.receiveFromQueue = function() { };
MessageHandler.prototype.respondToQueue = function({ data, metadata }) { };
module.exports = { MessageHandler };
