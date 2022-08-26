const utils = require("utils");
function HttpClientResponseMessageBus({ httpClientResponseMessageQueueBinding }) {
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientResponseMessageQueueBinding.messageQueue.dequeueMessage().then( async ({ message }) => {
            const httpResponse = message;
            const { body, statusCode, headers } = httpResponse;
            const messageStatusCode = statusCode;
            const { recipienthost, recipientport, senderhost, senderport, token } = headers;
            await callback(createHttpResponseMessage({
                scopeId: utils.generateGUID(),
                messageStatusCode, Id: null, data: body,
                recipientHost: recipienthost, recipientPort: recipientport, 
                metadata: headers, token,
                senderHost: senderhost, senderPort: senderport,
            }));
            this.subscribe({ callback });
        });
    }});
};
HttpClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpClientResponseMessageBus };
