function HttpServerMessageBus({ 
    scopeId,
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
