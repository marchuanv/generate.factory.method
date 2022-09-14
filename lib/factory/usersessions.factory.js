const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSessionsFactoryContainer } = require('C:\\component\\lib\\factory\\usersessions.container.json');
const { UserSessions } = require('C:\\component\\lib\\usersessions.prototype.js');

/**
* IsSingleton: UserSessionsFactoryContainer.singleton
* Create UserSessions
* @param {scopeId}
*/
function createUserSessions({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = UserSessionsFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, UserSessionsFactoryContainer);
}
module.exports = { createUserSessions };
