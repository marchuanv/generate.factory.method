function HttpServerMessageBusManagerMessageQueueBinding({ messageQueueBinding }) {
    const { HttpServerMessageBusManager } = require('../http/httpservermessagebusmanager.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpServerMessageBusManager });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpServerMessageBusManagerMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpServerMessageBusManagerMessageQueueBinding };


// const httpServerRequestsQueueName = `${scopeId}_httpserverrequests`;
// const httpServerResponseMessagesQueueName = `${scopeId}_httpserverresponsemessages`;
// const httpServerStartQueueName = 'httpserverstart';
// const httpServerStartedQueueName = 'httpserverstarted';
// const httpServerStopQueueName = 'httpserverstop';
// const httpServerStoppedQueueName = 'httpserverstopped';
// messageQueueBinder.bind({ queueName: httpServerRequestsQueueName });
// messageQueueBinder.bind({ queueName: httpServerResponseMessagesQueueName });
// messageQueueBinder.bind({ queueName: httpServerStartQueueName });
// messageQueueBinder.bind({ queueName: httpServerStartedQueueName });
// messageQueueBinder.bind({ queueName: httpServerStopQueueName });
// messageQueueBinder.bind({ queueName: httpServerStoppedQueueName });