function HttpServerMessageBusManager({ 
    contextName,
    httpServerRequestMessageQueueBinding,
    httpServerResponseMessageQueueBinding,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding
}) {
    this.constructor({ 
        contextName,
        httpServerRequestMessageQueueBinding,
        httpServerResponseMessageQueueBinding,
        httpServerStartMessageQueueBinding,
        httpServerStartedMessageQueueBinding,
        httpServerStopMessageQueueBinding,
        httpServerStoppedMessageQueueBinding
    });
}
module.exports = { HttpServerMessageBusManager };
