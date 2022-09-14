const { Factory } = require('../factory.js');
const { UserSecurityFactoryContainer } = require('C:\\component\\lib\\factory\\usersecurity.factory.container.json');
const { UserSecurity } = require('C:\\component\\lib\\usersecurity.prototype.js');
const { createUserSecurity } = require('C:\\component\\lib\\factory\\usersecurity.factory.js');

const factory = new Factory(UserSecurityFactoryContainer);

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {scopeId,userId}
*/
function createUserSecurity({scopeId,userId}) {
    const args = {scopeId,userId};
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
