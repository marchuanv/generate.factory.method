const { factory } = require('../../factory.js');

/**
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
