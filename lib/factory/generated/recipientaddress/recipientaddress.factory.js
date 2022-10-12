const { factory } = require('../../factory.js');

/**
* Create RecipientAddress
* @param {recipientHost,recipientPort,factoryContainerBindingName}
*/
function createRecipientAddress({recipientHost,recipientPort,factoryContainerBindingName}) {
    const bindings = {
    "Default": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.default.binding.json",
    "MultipleRequestsSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "D://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {recipientHost,recipientPort} });
}
module.exports = { createRecipientAddress };
