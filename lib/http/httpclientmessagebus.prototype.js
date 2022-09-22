function HttpClientMessageBus({ 
    factoryContainerBindingName,
    httpClientRequestMessageQueueBinding,
    httpClientResponseMessageQueueBinding,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    timeout
}) {
    this.constructor({ 
        factoryContainerBindingName,
        httpClientRequestMessageQueueBinding,
        httpClientResponseMessageQueueBinding,
        httpClientStartMessageQueueBinding,
        httpClientStartedMessageQueueBinding,
        httpClientStopMessageQueueBinding,
        timeout
    });
};
module.exports = { HttpClientMessageBus };
