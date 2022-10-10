const { Factory } = require('../../factory.js');

/**
* Create UserSessions
* @param {factoryContainerBindingName}
*/
function createUserSessions({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//usersessions//usersessions.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createUserSessions };
