const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSessions } = require('C:\\component\\lib\\usersessions.prototype.js');
const getUserSessionsFactoryConfig = require('C:\\component\\lib\\factory\\usersessions.factory.config.js');
/**
* IsSingleton: true 
* Create UserSessions 
* @param {scopeId}
*/
function createUserSessions({scopeId}) {
    const container = factory.getContainer({ scopeId, type: UserSessions, variableName:'userSessions', singleton: true });
    container.config(getUserSessionsFactoryConfig());
    container.reference({});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSessions };
