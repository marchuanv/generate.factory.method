const { HttpClientMessageBusManager } = require("./httpclientmessagebusmanager.prototype");
HttpClientMessageBusManager.prototype.constructor = function() {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.queueMessage({ message: { scopeId: message.scopeId } });
            httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { scopeId } });
        }
    });
}
