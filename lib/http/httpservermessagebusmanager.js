const { HttpServerMessageBusManager } = require("./httpservermessagebusmanager.prototype");
HttpServerMessageBusManager.prototype.constructor = function() {
    httpServerStartedMessageQueueBinding.peekMessage().then(({ message }) => {
        if (message) {
            const _message = message;
            httpServerStopMessageQueueBinding.queueMessage({ message: { scopeId: _message.scopeId } });
            httpServerStoppedMessageQueueBinding.dequeueMessage().then(({ message }) => {
                if (scopeId !== message.scopeId && _message.scopeId === message.scopeId) {
                    httpServerStartMessageQueueBinding.queueMessage({ message: { scopeId } });
                }
            });
        } else {
            httpServerStartMessageQueueBinding.queueMessage({ message: { scopeId } });
        }
    });
}
