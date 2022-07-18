const { createMessage } = require("./factory/message.factory");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler, senderAddress, userId, token }) {
    const handler = httpMessageHandler || webSocketMessageHandler;
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 2 });
        const { responseMessage } = await handler.send({ requestMessage: message });
        return { responseMessage };
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        await handler.receive({ callback: async ({ requestMessage }) => await callback({ requestMessage }) });
    }});
    Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        const { senderHost, senderPort } = senderAddress;
        const { message } = createMessage({ senderHost, senderPort, userId, data, token, metadata, messageStatusCode: 200 });
        await handler.respond({ responseMessage: message });
    }});
}
MessageHandler.prototype.send = async function({ data, metadata }) { };
MessageHandler.prototype.receive = function({ callback }) { };
MessageHandler.prototype.respond = function({ data, metadata }) { };
module.exports = { MessageHandler };