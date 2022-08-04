const factory = require('./factory.js');

const { SharedUserSessions } = require('C:\\component\\lib\\sharedusersessions.js');
/**
* Create SharedUserSessions
* @param {}
*/
function createSharedUserSessions({}) {
    const container = factory.createContainer({ type: SharedUserSessions, variableName:'sharedUserSessions', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedUserSessions };
