function HttpClientMessageBusManager({ 
    factoryContainerBindingName,
    httpClientStartMessageQueueBinding,
    httpClientStartedMessageQueueBinding,
    httpClientStopMessageQueueBinding
}) {
    this.constructor({ 
        factoryContainerBindingName,
        httpClientStartMessageQueueBinding,
        httpClientStartedMessageQueueBinding,
        httpClientStopMessageQueueBinding
    });
}
module.exports = { HttpClientMessageBusManager };
