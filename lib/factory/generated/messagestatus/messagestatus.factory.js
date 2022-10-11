const { factory } = require('../../factory.js');

/**
* Create MessageStatus
* @param {messageStatusCode,factoryContainerBindingName}
*/
function createMessageStatus({messageStatusCode,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//messagestatus//messagestatus.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName] || bindings['Default'] });
    return container.getInstance({ ctorArgs: {messageStatusCode} });
}
module.exports = { createMessageStatus };
