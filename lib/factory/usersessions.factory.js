const factory = require('./factory.js');

const { UserSessions } = require('C:\\component\\lib\\usersessions.js');
/**
* IsSingleton: true 
* Create UserSessions 
* @param {}
*/
function createUserSessions({ scopeId,  }) {
    const container = factory.createContainer({ scopeId, type: UserSessions, variableName:'userSessions', singleton: true });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createUserSessions };
