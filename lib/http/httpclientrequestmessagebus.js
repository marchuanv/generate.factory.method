const { HttpClientRequestMessageBus } = require("./httpclientrequestmessagebus.prototype");
HttpClientRequestMessageBus.prototype.constructor = function() {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        httpClientRequestMessageQueueBinding.queueMessage({ message: httpRequestMessage });
    }});
};
