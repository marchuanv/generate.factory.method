const { HttpClientRequestMessageBus } = require("./httpclientrequestmessagebus.prototype");
HttpClientRequestMessageBus.prototype.constructor = function({ httpClientRequestMessageQueueBinding }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        httpClientRequestMessageQueueBinding.queueMessage({ message: httpRequestMessage });
    }});
};
module.exports = { HttpClientRequestMessageBus };
