const { Factory } = require('../../factory.js');

/**
* Create UserSecurity
* @param {userId,factoryContainerBindingName}
*/
function createUserSecurity({userId,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {userId} });
}
module.exports = { createUserSecurity };
