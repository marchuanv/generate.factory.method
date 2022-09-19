const { HttpClientMessageBusManager } = require("./httpclientmessagebusmanager.prototype");
HttpClientMessageBusManager.prototype.constructor = function() {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName: message.factoryContainerBindingName } });
            httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        }
    });
}
