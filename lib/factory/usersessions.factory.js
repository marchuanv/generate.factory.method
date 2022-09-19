const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersessions.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSessionsFactoryContainer.singleton
* Create UserSessions
* @param {scopeId}
*/
function createUserSessions({scopeId}) {
    const args = {scopeId};
    const binding = UserSessionsFactoryContainer.bindings[scopeId];
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
module.exports = { createUserSessions };
