const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSecurityFactoryContainer } = require('C:\\component\\lib\\factory\\usersecurity.container.json');
const { UserSecurity } = require('C:\\component\\lib\\usersecurity.prototype.js');

/**
* IsSingleton: UserSecurityFactoryContainer.singleton
* Create UserSecurity
* @param {scopeId,userId}
*/
function createUserSecurity({scopeId,userId}) {
    const args = {scopeId,userId};
    const { scopeId } = args;
    const binding = UserSecurityFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, UserSecurityFactoryContainer);
}
module.exports = { createUserSecurity };
