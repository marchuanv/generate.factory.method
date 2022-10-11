const { factory } = require('../../factory.js');

/**
* Create UserSessions
* @param {factoryContainerBindingName}
*/
function createUserSessions({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//usersessions//usersessions.factory.container.default.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName] || bindings['Default'] });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createUserSessions };
