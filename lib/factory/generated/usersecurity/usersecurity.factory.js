const { factory } = require('../../factory.js');

/**
* Create UserSecurity
* @param {userId,factoryContainerBindingName}
*/
function createUserSecurity({userId,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {userId} });
}
module.exports = { createUserSecurity };
