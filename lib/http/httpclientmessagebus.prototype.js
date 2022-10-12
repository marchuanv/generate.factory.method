function HttpClientMessageBus({ 
    factoryContainerBindingName,
    httpClientRequestMessageQueueBinding,
    httpClientResponseMessageQueueBinding,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding,
    timeout
}) {
    this.constructor({ 
        factoryContainerBindingName,
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
