const { Message } = require("./message");
const { HttpResponseMessage } = require("./http/httpresponsemessage");
const { MessageStatus } = require("./messagestatus");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler }) {
    const { createMessageConverter } = require('./factory/messageconverter.factory');
    const { messageConverter } = createMessageConverter({});
    if (httpMessageHandler) {
        Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ metadata, data }) => {
            const { responseMessage } = await httpMessageHandler.send({ path: 'messagehandler', headers: metadata, method: 'POST', data });
            return responseMessage
        }});
        Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
            httpMessageHandler.receive({ callback: async ({ requestMessage }) => {
                const { responseMessage } = await callback({ requestMessage });
                return { responseMessage };
            }});
        }});
    } else if (webSocketMessageHandler) {
        Object.defineProperty(this, 'send', { configurable: false, writable: false, value: async ({ recipientAddress, data }) => {
            return await webSocketMessageHandler.send({ recipientAddress, data });
        }});
        Object.defineProperty(this, 'receive', { configurable: false, writable: false, value: ({ callback }) => {
            webSocketMessageHandler.receive({ callback: async ({ message }) => {
                return await callback({ message });
            }});
        }});
    }
}
MessageHandler.prototype.send = async function({ metadata, data }) { };
MessageHandler.prototype.receive = function({ callback }) { };
module.exports = { MessageHandler };