const { HttpMessageHandler } = require("./http//httpmessagehandler");
const { WebSocketMessageHandler } = require("./websocket/websocketmessagehandler");
const { HttpMessageFactory } = require("./http//httpmessagefactory");
const { WebSocketMessageFactory } = require("./websocket/websocketmessagefactory");
const { HttpRequestMessage } = require("./http/httprequestmessage");
const { Message } = require("./message");
const { HttpResponseMessage } = require("./http/httpresponsemessage");
const { MessageStatus } = require("./messagestatus");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler, httpMessageFactory, webSocketMessageFactory }) {
    if (!(httpMessageHandler instanceof HttpMessageHandler) && !(webSocketMessageHandler instanceof WebSocketMessageHandler)) {
        throw new Error("the 'httpMessageHandler' or 'webSocketMessageHandler' parameters are null, undefined or not of type: HttpMessageHandler or WebSocketMessageHandler");
    }
    if (!(httpMessageFactory instanceof HttpMessageFactory) && !(webSocketMessageFactory instanceof WebSocketMessageFactory)) {
        throw new Error("the 'httpMessageFactory' or 'webSocketMessageFactory' parameters are null, undefined or not of type: HttpMessageFactory or WebSocketMessageFactory");
    }
    if (httpMessageHandler) {
        Object.defineProperty(this, 'send', { writable: false, value: async ({ recipientAddress, data }) => {
            const httpResponseMessage = await httpMessageHandler.send({ recipientAddress, data });
            return { message: httpMessageFactory.convertHttpResponseMessageToMessage({ httpResponseMessage })};
        }});
        Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
            httpMessageHandler.receive({ callback: async ({ httpRequestMessage }) => {
                if (!(httpRequestMessage instanceof HttpRequestMessage)) {
                    throw new Error("'httpRequestMessage' parameter is undefined, null or not of type: HttpRequestMessage");
                }
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
MessageHandler.prototype.send = async function({ recipientAddress, data }) { };
MessageHandler.prototype.receive = function({ callback }) { };
module.exports = { MessageHandler };