const { factory } = require('../../factory.js');

/**
* Create ServerMessageBus
* @param {factoryContainerBindingName}
*/
function createServerMessageBus({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createServerMessageBus };
