const { createMessage } = require("./factory/message.factory");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler, userId }) {
    const messageHandler = httpMessageHandler || webSocketMessageHandler;
    Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        const requestMessage = createMessage({ userId, data, metadata, messageStatusCode: 2 });
        const { responseMessage } = await messageHandler.send({ requestMessage });
        return responseMessage
    }});
    Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: async ({ callback }) => {
        await messageHandler.receive({ callback: async ({ requestMessage }) => {
            await callback({ requestMessage });
        }});
    }});
    Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: async ({ data, metadata }) => {
        const responseMessage = createMessage({ userId, data, metadata, messageStatusCode: 200 });
        await messageHandler.respond({ responseMessage });
    }});
}
MessageHandler.prototype.send = async function({ data, metadata }) { };
MessageHandler.prototype.receive = function({ callback }) { };
MessageHandler.prototype.respond = function({ data, metadata }) { };
module.exports = { MessageHandler };