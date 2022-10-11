const { factory } = require('../../factory.js');

/**
* Create HttpRequestMessage
* @param {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createHttpRequestMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//httprequestmessage//httprequestmessage.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const binding = require(bindings[factoryContainerBindingName]);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createHttpRequestMessage };
