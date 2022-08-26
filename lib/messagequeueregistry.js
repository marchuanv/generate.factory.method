function MessageQueueRegistry({ factoryContainer }) {
    const HttpClientMessageBusBinding = require('./binding/httpclientmessagebusbinding.js');
    const HttpClientMessageBusManagerBinding = require('./binding/httpclientmessagebusmanagerbinding.js');
    const HttpClientRequestMessageBusBinding = require('./binding/httpclientrequestmessagebusbinding.js');
    const HttpClientResponseMessageBusBinding = require('./binding/httpclientresponsemessagebusbinding.js');
    const HttpServerMessageBusBinding = require('./binding/httpservermessagebusbinding.js');
    const HttpServerMessageBusManagerBinding = require('./binding/httpservermessagebusmanagerbinding.js');
    const HttpServerRequestsMessageBusBinding = require('./binding/httpserverrequestsmessagebusbinding.js');
    const HttpServerResponseMessageBusBinding = require('./binding/httpserverresponsemessagebusbinding.js');
    Object.defineProperty(this, 'getBindings', { configurable: false, writable: false, value: () => {
        const bindings = [];
        {
            const { httpClientMessageBusBinding } = factoryContainer.get({ type: HttpClientMessageBusBinding });
            bindings.push(httpClientMessageBusBinding);
        }
        {
            const { httpClientMessageBusManagerBinding } = factoryContainer.get({ type: HttpClientMessageBusManagerBinding });
            bindings.push(httpClientMessageBusManagerBinding);
        }
        {
            const { httpClientRequestMessageBusBinding } = factoryContainer.get({ type: HttpClientRequestMessageBusBinding });
            bindings.push(httpClientRequestMessageBusBinding);
        }
        {
            const { httpClientResponseMessageBusBinding } = factoryContainer.get({ type: HttpClientResponseMessageBusBinding });
            bindings.push(httpClientResponseMessageBusBinding);
        }
        {
            const { httpServerMessageBusBinding } = factoryContainer.get({ type: HttpServerMessageBusBinding });
            bindings.push(httpServerMessageBusBinding);
        }
        {
            const { httpServerMessageBusManagerBinding } = factoryContainer.get({ type: HttpServerMessageBusManagerBinding });
            bindings.push(httpServerMessageBusManagerBinding);
        }
        {
            const { httpServerRequestsMessageBusBinding } = factoryContainer.get({ type: HttpServerRequestsMessageBusBinding });
            bindings.push(httpServerRequestsMessageBusBinding);
        }
        {
            const { httpServerResponseMessageBusBinding } = factoryContainer.get({ type: HttpServerResponseMessageBusBinding });
            bindings.push(httpServerResponseMessageBusBinding);
        }
        return bindings;
     }});
   
};
MessageQueueRegistry.prototype.getTypes = function() { };
module.exports = { MessageQueueRegistry };
