const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersecurity.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {userId}
*/
function createUserSecurity({userId}) {
    const args = {userId};
    const binding = UserSecurityFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createUserSecurity };
