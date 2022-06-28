const { HttpMessageHandler } = require("./http//httpmessagehandler");
const { WebSocketMessageHandler } = require("./websocket/websocketmessagehandler");
const { HttpMessageFactory } = require("./http//httpmessagefactory");
const { WebSocketMessageFactory } = require("./websocket/websocketmessagefactory");
const { HttpRequestMessage } = require("./http/httprequestmessage");
const { Message } = require("./message");
const { HttpResponseMessage } = require("./http/httpresponsemessage");
const { MessageStatus } = require("./messagestatus");

function MessageHandler({ httpMessageHandler, webSocketMessageHandler, httpMessageFactory, webSocketMessageFactory, hostAddress }) {
    if (!(httpMessageHandler instanceof HttpMessageHandler) && !(webSocketMessageHandler instanceof WebSocketMessageHandler)) {
        throw new Error("the 'httpMessageHandler' or 'webSocketMessageHandler' parameters are null, undefined or not of type: HttpMessageHandler or WebSocketMessageHandler");
    }
    if (!(httpMessageFactory instanceof HttpMessageFactory) && !(webSocketMessageFactory instanceof WebSocketMessageFactory)) {
        throw new Error("the 'httpMessageFactory' or 'webSocketMessageFactory' parameters are null, undefined or not of type: HttpMessageFactory or WebSocketMessageFactory");
    }
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is undefined or null");
    }
    if (httpMessageHandler) {
        Object.defineProperty(this, 'send', { writable: false, value: async ({ address, data }) => {
            const httpResponseMessage = await httpMessageHandler.send({ address, data });
            return { message: httpMessageFactory.convertHttpResponseMessageToMessage({ httpResponseMessage })};
        }});
        Object.defineProperty(this, 'receive', { writable: false, value: ({ callback }) => {
            httpMessageHandler.receive({ hostAddress, callback: async ({ httpRequestMessage }) => {
                if (!(httpRequestMessage instanceof HttpRequestMessage)) {
                    throw new Error("'httpRequestMessage' parameter is undefined, null or not of type: HttpRequestMessage");
                }
                let message = httpMessageFactory.convertHttpRequestMessageToMessage({ httpRequestMessage });
                message = await callback({ message });
                if (!message) {
                    const fromHost = httpRequestMessage.getFromHost();
                    return httpMessageFactory.createHttpResponseMessage({ fromHost, data: 'success', headers: {}, messageStatus: new MessageStatus({ code: 0 }) });
                } else if (message instanceof Message) {
                    return httpMessageFactory.convertMessageToHttpResponseMessage({ message });
                } else if (message instanceof HttpResponseMessage) {
                    return message;
                }
            }});
        }});
    } else if (webSocketMessageHandler) {
        Object.defineProperty(this, 'send', { writable: false, value: async ({ address, data }) => {
            return await webSocketMessageHandler.send({ address, data });
        }});
        Object.defineProperty(this, 'receive', { writable: false, value: ({ address, callback }) => {
            webSocketMessageHandler.receive({ address, callback: async ({ message }) => {
                return await callback({ message });
            }});
        }});
    }
}
MessageHandler.prototype.send = async function({ address, data }) { };
MessageHandler.prototype.receive = function({ callback }) { };
module.exports = { MessageHandler };