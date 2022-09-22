function HttpServerMessageBusManager({ 
    factoryContainerBindingName,
    httpServerRequestMessageQueueBinding,
    httpServerResponseMessageQueueBinding,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding
}) {
    this.constructor({ 
        factoryContainerBindingName,
        httpServerRequestMessageQueueBinding,
        httpServerResponseMessageQueueBinding,
        httpServerStartMessageQueueBinding,
        httpServerStartedMessageQueueBinding,
        httpServerStopMessageQueueBinding,
        httpServerStoppedMessageQueueBinding
    });
}
module.exports = { HttpServerMessageBusManager };
