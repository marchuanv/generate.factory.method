const { factory } = require('../../factory.js');

/**
* Create SenderAddress
* @param {senderHost,senderPort,factoryContainerBindingName}
*/
function createSenderAddress({senderHost,senderPort,factoryContainerBindingName}) {
    const bindings = {
    "Default": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.default.binding.json",
    "MultipleRequestsSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "D://component//lib//factory//generated//senderaddress//senderaddress.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {senderHost,senderPort} });
}
module.exports = { createSenderAddress };
