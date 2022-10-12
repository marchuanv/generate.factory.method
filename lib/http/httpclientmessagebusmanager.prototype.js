function HttpClientMessageBusManager({ 
    factoryContainerBindingName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding,
    httpClientStoppedMessageQueueBinding
}) {
    this.constructor({ 
        factoryContainerBindingName,
        httpClientStartMessageQueueBinding,
        httpClientStartedMessageQueueBinding,
        httpClientStopMessageQueueBinding,
        httpClientStoppedMessageQueueBinding
    });
}
module.exports = { HttpClientMessageBusManager };
