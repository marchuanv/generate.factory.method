const utils = require("utils");
const { WebSocketClientResponseMessageBus } = require("./websocketclientresponsemessagebus.prototype");
WebSocketClientResponseMessageBus.prototype.constructor = function() {
    const { createWebSocketResponseMessage } = require('../factory/websocketresponsemessage.factory');
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        websocketClientResponseMessageQueueBinding.dequeueMessage().then( async ({ message }) => {
            const httpResponse = message;
            const { body, statusCode, headers } = httpResponse;
            const messageStatusCode = statusCode;
            const { recipienthost, recipientport, senderhost, senderport, token } = headers;
            await callback(createWebSocketResponseMessage({
                factoryContainerBindingName: utils.generateGUID(),
                messageStatusCode, Id: null, data: body,
                recipientHost: recipienthost,
                recipientPort: recipientport,
                metadata: headers, token,
                senderHost: senderhost,
                senderPort: senderport
            }));
            this.subscribe({ callback });
        });
    }});
};
