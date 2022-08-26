function HttpClientMessageBusManagerMessageQueueBinding({ messageQueueBinding }) {
    const { HttpClientMessageBusManager } = require('./httpclientmessagebusmanager.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpClientMessageBusManager });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpClientMessageBusManagerMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpClientMessageBusManagerMessageQueueBinding };

// const httpClientRequestMessagesQueueName = `${scopeId}_httpclientrequestmessages`;
// const httpClientResponseQueueName = `${scopeId}_httpclientresponse`;
// const httpClientStartQueueName = 'httpclientstart';
// const httpClientStartedQueueName = 'httpclientstarted';
// const httpClientStopQueueName = 'httpclientstop';
// const httpClientStoppedQueueName = 'httpclientstopped';
// messageQueueBinder.bind({ queueName: httpClientRequestMessagesQueueName });
// messageQueueBinder.bind({ queueName: httpClientResponseQueueName });
// messageQueueBinder.bind({ queueName: httpClientStartQueueName });
// messageQueueBinder.bind({ queueName: httpClientStartedQueueName });
// messageQueueBinder.bind({ queueName: httpClientStopQueueName });
// messageQueueBinder.bind({ queueName: httpClientStoppedQueueName });