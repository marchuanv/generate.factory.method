const utils = require('utils');
const { createHttpRequestMessage } = require('../factory/generated/httprequestmessage/httprequestmessage.factory');
const { HttpServerRequestMessageBus } = require("./httpserverrequestmessagebus.prototype");
HttpServerRequestMessageBus.prototype.constructor = function({ httpServerRequestMessageQueueBinding }) {
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpServerRequestMessageQueueBinding.dequeueMessage().then( async ({ message }) => {
            const httpRequest = message;
            const { headers, body, path } = httpRequest;
            const metadata = headers;
            let { recipienthost, recipientport, senderhost, senderport, token } = metadata;
            recipientport = isNaN(recipientport) ? recipientport : Number(recipientport);
            senderport = isNaN(senderport) ? senderport : Number(senderport);
            metadata['recipientport'] = recipientport;
            metadata['senderport'] = senderport;
            metadata.path = path;
            const messageStatusCode = 2;
            await callback(createHttpRequestMessage({ 
                factoryContainerBindingName: utils.generateGUID(),
                messageStatusCode, Id: null, data: body,
                recipientHost: recipienthost, recipientPort: recipientport,
                metadata, token, senderHost: senderhost, senderPort: senderport
            }));
            this.subscribe({ callback });
        });
    }});
};
module.exports = { HttpServerRequestMessageBus };
