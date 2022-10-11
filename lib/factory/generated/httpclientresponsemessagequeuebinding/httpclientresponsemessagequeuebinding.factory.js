const { factory } = require('../../factory.js');

/**
* Create HttpClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const binding = require(bindings[factoryContainerBindingName]);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
