const { HttpServerMessageBusManager } = require("./httpservermessagebusmanager.prototype");
HttpServerMessageBusManager.prototype.constructor = function({ 
    factoryContainerBindingName,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding
}) {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const messagsBindingName = message.factoryContainerBindingName;
            httpServerStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName: messagsBindingName } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (message.factoryContainerBindingName === messagsBindingName) {
                    httpServerStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
                }
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        }
    });
}
module.exports = { HttpServerMessageBusManager };
