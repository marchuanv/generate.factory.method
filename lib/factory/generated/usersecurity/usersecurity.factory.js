const { factory } = require('../../factory.js');

/**
* Create UserSecurity
* @param {userId,factoryContainerBindingName}
*/
function createUserSecurity({userId,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {userId} });
}
module.exports = { createUserSecurity };
