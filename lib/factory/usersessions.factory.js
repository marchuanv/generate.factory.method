const factory = require('../factory.js');

const { UserSessions } = require('C:\\component\\lib\\usersessions.js');
/**
* IsSingleton: false 
* Create UserSessions 
* @param {scopeId}
*/
function createUserSessions({scopeId}) {
    let container = factory.getContainer({ scopeId, type: UserSessions, variableName:'userSessions', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: UserSessions, variableName:'userSessions', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSessions };
