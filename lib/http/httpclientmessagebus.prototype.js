function HttpClientMessageBus({ 
    contextName,
    httpClientRequestMessageQueueBinding,
    httpClientResponseMessageQueueBinding,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding,
    timeout
}) {
    this.constructor({ 
        contextName,
        httpClientRequestMessageQueueBinding,
        httpClientResponseMessageQueueBinding,
        httpClientStartMessageQueueBinding,
        httpClientStartedMessageQueueBinding,
        httpClientStopMessageQueueBinding,
        httpClientStoppedMessageQueueBinding,
        timeout
    });
};
module.exports = { HttpClientMessageBus };
