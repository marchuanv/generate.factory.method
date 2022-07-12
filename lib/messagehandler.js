function MessageHandler({ httpMessageHandler, webSocketMessageHandler }) {
    if (httpMessageHandler) {
        Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ metadata, data }) => {
            const { responseMessage } = await httpMessageHandler.send({ path: 'messagehandler', headers: metadata, method: 'POST', data });
            return responseMessage
        }});
        Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
            httpMessageHandler.receive({ callback: async ({ requestMessage }) => {
                await callback({ requestMessage });
            }});
        }});
        Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: ({ metadata, data }) => {
            httpMessageHandler.respond({ metadata, data });
        }});
    } else if (webSocketMessageHandler) {
        Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ metadata, data }) => {
            const { responseMessage } = await webSocketMessageHandler.send({ path: 'messagehandler', headers: metadata, method: 'POST', data });
            return responseMessage
        }});
        Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
            webSocketMessageHandler.receive({ callback: async ({ requestMessage }) => {
                await callback({ requestMessage });
            }});
        }});
        Object.defineProperty(this, 'respond', { configurable: false, writable: false, value: ({ callback }) => {
            webSocketMessageHandler.respond({ metadata, data });
        }});
    }
}
MessageHandler.prototype.send = async function({ metadata, data }) { };
MessageHandler.prototype.receive = function({ callback }) { };
MessageHandler.prototype.respond = function({ metadata, data }) { };
module.exports = { MessageHandler };