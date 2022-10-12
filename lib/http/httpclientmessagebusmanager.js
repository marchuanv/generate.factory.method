const { HttpClientMessageBusManager } = require("./httpclientmessagebusmanager.prototype");
HttpClientMessageBusManager.prototype.constructor = function({ 
    factoryContainerBindingName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding
}) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const messagsBindingName = message.factoryContainerBindingName;
            httpClientStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName: messagsBindingName } });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (message.factoryContainerBindingName === messagsBindingName) {
                    httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
                }
            });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
