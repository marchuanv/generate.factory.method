const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\usersessions.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: UserSessionsFactoryContainer.singleton
* Create UserSessions
* @param {factoryContainerBindingName,scopeId}
*/
function createUserSessions({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createUserSessions };
