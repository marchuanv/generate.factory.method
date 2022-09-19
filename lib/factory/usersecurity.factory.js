const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {factoryContainerBindingName,userId}
*/
function createUserSecurity({factoryContainerBindingName,userId}) {
    const ctorArgs = {factoryContainerBindingName,userId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createUserSecurity };
