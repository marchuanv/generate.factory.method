function HttpServerMessageBus({ 
    factoryContainerBindingName,
    httpServerRequestMessageQueueBinding,
    httpServerResponseMessageQueueBinding,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding,
    senderAddress,
    logger,
    timeout
}) {}
module.exports = { HttpServerMessageBus };
