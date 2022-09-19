const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {factoryContainerBindingName,userId}
*/
function createUserSecurity({factoryContainerBindingName,userId}) {
    const args = {factoryContainerBindingName,userId};
    const binding = UserSecurityFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createUserSecurity };
