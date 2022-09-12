const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSessions } = require('C:\\component\\lib\\usersessions.js');
/**
* IsSingleton: true 
* Create UserSessions 
* @param {scopeId}
*/
function createUserSessions({scopeId}) {
    let container = factory.getContainer({ scopeId, type: UserSessions, variableName:'userSessions', singleton: true });
    container.config({});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSessions };
