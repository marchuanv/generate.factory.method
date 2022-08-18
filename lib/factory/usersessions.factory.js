const factory = require('./factory.js');

const { UserSessions } = require('C:\\component\\lib\\usersessions.js');
/**
* Create UserSessions
* @param {}
*/
function createUserSessions({}) {
    const container = factory.createContainer({ type: UserSessions, variableName:'userSessions', singleton: false });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createUserSessions };
