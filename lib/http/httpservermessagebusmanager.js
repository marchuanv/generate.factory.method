const { HttpServerMessageBusManager } = require("./httpservermessagebusmanager.prototype");
HttpServerMessageBusManager.prototype.constructor = function({ 
    contextName,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding
}) {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const messagsContextName = message.contextName;
            httpServerStopMessageQueueBinding.queueMessage({ message: { contextName: messagsContextName } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (message.contextName === messagsContextName) {
                    httpServerStartMessageQueueBinding.queueMessage({ message: { contextName } });
                }
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: { contextName } });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
