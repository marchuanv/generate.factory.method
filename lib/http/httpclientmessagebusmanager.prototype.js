function HttpClientMessageBusManager({ 
    contextName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding
}) {
    this.constructor({ 
        contextName,
        httpClientStartMessageQueueBinding,
        httpClientStartedMessageQueueBinding,
        httpClientStopMessageQueueBinding,
        httpClientStoppedMessageQueueBinding
    });
}
module.exports = { HttpClientMessageBusManager };
