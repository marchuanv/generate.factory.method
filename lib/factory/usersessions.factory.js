const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersessions.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSessionsFactoryContainer.singleton
* Create UserSessions
* @param {factoryContainerBindingName,scopeId}
*/
function createUserSessions({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = UserSessionsFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createUserSessions };
