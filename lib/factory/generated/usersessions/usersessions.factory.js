const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//usersessions//usersessions.factory.container.json');
const factory = new Factory(container);

/**
* Create UserSessions
* @param {factoryContainerBindingName}
*/
function createUserSessions({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createUserSessions };
