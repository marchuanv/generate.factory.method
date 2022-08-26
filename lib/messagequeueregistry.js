function MessageQueueRegistry({ factoryContainer, messageQueue }) {
    const HttpClientMessageBus = require('./http/httpclientmessagebus.js');
    const HttpClientMessageBusManager = require('./http/httpclientmessagebusmanager.js');
    const HttpClientRequestMessageBus = require('./http/httpclientrequestmessagebus.js');
    const HttpClientResponseMessageBus = require('./http/httpclientresponsemessagebus.js');
    const HttpServerMessageBus = require('./http/httpservermessagebus.js');
    const HttpServerMessageBusManager = require('./http/httpservermessagebusmanager.js');
    const HttpServerRequestsMessageBus = require('./httpserverrequestsmessagebus.js');
    const HttpServerResponseMessageBus = require('./httpserverresponsemessagebus.js');
    {
        const { type } = factoryContainer.get({ type: HttpClientMessageBus });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpClientMessageBusManager });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpClientRequestMessageBus });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpClientResponseMessageBus });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpServerMessageBus });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpServerMessageBusManager });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpServerRequestsMessageBus });
        messageQueue.bind({ type });
    }
    {
        const { type } = factoryContainer.get({ type: HttpServerResponseMessageBus });
        messageQueue.bind({ type });
    }
};
module.exports = { MessageQueueRegistry };
