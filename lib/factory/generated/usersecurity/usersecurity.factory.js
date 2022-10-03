const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//usersecurity//usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* Create UserSecurity
* @param {userId,factoryContainerBindingName}
*/
function createUserSecurity({userId,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {userId} });
}
module.exports = { createUserSecurity };
