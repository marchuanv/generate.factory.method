const { HttpServerMessageBusManager } = require("./httpservermessagebusmanager.prototype");
HttpServerMessageBusManager.prototype.constructor = function() {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const _message = message;
            httpServerStopMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName: _message.factoryContainerBindingName } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (factoryContainerBindingName !== message.factoryContainerBindingName && _message.factoryContainerBindingName === message.factoryContainerBindingName) {
                    httpServerStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
                }
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: { factoryContainerBindingName } });
        }
    });
}
