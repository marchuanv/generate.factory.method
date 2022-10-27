function HttpServerMessageBus({ 
    contextName,
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
        contextName,
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
