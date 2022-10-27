const { HttpClientMessageBusManager } = require("./httpclientmessagebusmanager.prototype");
HttpClientMessageBusManager.prototype.constructor = function({ 
    contextName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding
}) {
    httpClientStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const messagsContextName = message.contextName;
            httpClientStopMessageQueueBinding.queueMessage({ message: { contextName: messagsContextName } });
            httpClientStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (message.contextName === messagsContextName) {
                    httpClientStartMessageQueueBinding.queueMessage({ message: { contextName } });
                }
            });
        } else {
            httpClientStartMessageQueueBinding.queueMessage({ message: { contextName } });
        }
    });
}
module.exports = { HttpClientMessageBusManager };
