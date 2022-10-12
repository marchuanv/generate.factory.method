const { factory } = require('../../factory.js');

/**
* Create HttpServerRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageBus({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//httpserverrequestmessagebus//httpserverrequestmessagebus.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerRequestMessageBus };
