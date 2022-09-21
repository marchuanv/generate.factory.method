const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {userId}
*/
function createUserSecurity({userId}) {
    const ctorArgs = {userId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createUserSecurity };
