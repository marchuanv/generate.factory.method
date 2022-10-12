const { factory } = require('../../factory.js');

/**
* Create RecipientAddress
* @param {recipientHost,recipientPort,factoryContainerBindingName}
*/
function createRecipientAddress({recipientHost,recipientPort,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {recipientHost,recipientPort} });
}
module.exports = { createRecipientAddress };
