const { factory } = require('../../factory.js');

/**
* Create ContentType
* @param {name,factoryContainerBindingName}
*/
function createContentType({name,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {name} });
}
module.exports = { createContentType };
