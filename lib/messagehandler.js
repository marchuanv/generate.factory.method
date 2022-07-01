const { HttpMessageHandler } = require("./http//httpmessagehandler");
const { WebSocketMessageHandler } = require("./websocket/websocketmessagehandler");
const { Message } = require("./message");
const { HttpResponseMessage } = require("./http/httpresponsemessage");
const { MessageStatus } = require("./messagestatus");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler }) {
    if (!(httpMessageHandler instanceof HttpMessageHandler) && !(webSocketMessageHandler instanceof WebSocketMessageHandler)) {
        throw new Error("the 'httpMessageHandler' or 'webSocketMessageHandler' parameters are null, undefined or not of type: HttpMessageHandler or WebSocketMessageHandler");
    }
    if (!(httpMessageFactory instanceof HttpMessageFactory) && !(webSocketMessageFactory instanceof WebSocketMessageFactory)) {
        throw new Error("the 'httpMessageFactory' or 'webSocketMessageFactory' parameters are null, undefined or not of type: HttpMessageFactory or WebSocketMessageFactory");
    }
    if (httpMessageHandler) {
        Object.defineProperty(this, 'send', { writable: false, value: async ({ metadata, data }) => {
            const { httpResponseMessage } = await httpMessageHandler.send({ path: 'messagehandler', headers: metadata, method: 'POST', data });
            return { message: httpMessageFactory.convertHttpResponseMessageToMessage({ httpResponseMessage })};
        }});
        Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
            httpMessageHandler.receive({ callback: async ({ httpRequestMessage }) => {
                let message = httpMessageFactory.convertHttpRequestMessageToMessage({ httpRequestMessage });
                message = await callback({ message });
                if (!message) {
                    const fromHost = httpRequestMessage.getRecipientAddress();
                    return httpMessageFactory.createHttpResponseMessage({ fromHost, data: 'success', headers: {}, messageStatus: new MessageStatus({ code: 0 }) });
                } else if (message instanceof Message) {
                    return httpMessageFactory.convertMessageToHttpResponseMessage({ message });
                } else if (message instanceof HttpResponseMessage) {
                    return message;
                }
            }});
        }});
    } else if (webSocketMessageHandler) {
        Object.defineProperty(this, 'send', { writable: false, value: async ({ recipientAddress, data }) => {
            return await webSocketMessageHandler.send({ recipientAddress, data });
        }});
        Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
            webSocketMessageHandler.receive({ callback: async ({ message }) => {
                return await callback({ message });
            }});
        }});
    }
}
MessageHandler.prototype.send = async function({ metadata, data }) { };
MessageHandler.prototype.receive = function({ callback }) { };
module.exports = { MessageHandler };