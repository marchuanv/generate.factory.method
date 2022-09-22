const { HttpClientMessageBusManager } = require("./httpclientmessagebusmanager.prototype");
HttpClientMessageBusManager.prototype.constructor = function({ 
    factoryContainerBindingName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding
}) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            httpClientStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName: message.factoryContainerBindingName } });
            httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
