const { factory } = require('../../factory.js');

/**
* Create HttpClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const binding = require(bindings[factoryContainerBindingName]);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageQueueBinding };
