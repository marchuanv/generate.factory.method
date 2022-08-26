function HttpClientRequestMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpClientRequestMessageBus } = require('../http/httpclientrequestmessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpClientRequestMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpClientRequestMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpClientRequestMessageBusMessageQueueBinding };


// const httpClientRequestMessagesQueueName = `${scopeId}_httpclientrequestmessages`;
//     messageQueueBinder.bind({ queueName: httpClientRequestMessagesQueueName });