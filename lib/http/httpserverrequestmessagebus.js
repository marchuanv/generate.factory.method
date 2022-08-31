const utils = require('utils');
function HttpServerRequestMessageBus({ httpServerRequestMessageQueueBinding }) {
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
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
                scopeId: utils.generateGUID(),
                messageStatusCode, Id: null, data: body,
                recipientHost: recipienthost, recipientPort: recipientport,
                metadata, token, senderHost: senderhost, senderPort: senderport
            }));
            this.subscribe({ callback });
        });
    }});
};
HttpServerRequestMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { HttpServerRequestMessageBus };
