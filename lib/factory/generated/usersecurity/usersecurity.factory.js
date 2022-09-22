const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\usersecurity\\usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {userId}
*/
function createUserSecurity({userId,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {userId} });
}
module.exports = { createUserSecurity };
