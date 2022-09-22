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
}) {
    this.constructor({ 
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
    });
}
module.exports = { HttpServerMessageBus };
