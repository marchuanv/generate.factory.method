const { factory } = require('../../factory.js');

/**
* Create HttpRequestMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createHttpRequestMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    const bindings = {
    "Default": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.default.binding.json",
    "MultipleRequestsSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "D://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createHttpRequestMessage };
