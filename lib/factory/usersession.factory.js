const factory = require('./factory.js');

const { UserSession } = require('C:\\component\\lib\\usersession.js');
/**
* Create UserSession
* @param {userId}
*/
function createUserSession({userId}) {
    const container = factory.createContainer({ type: UserSession, variableName:'userSession', singleton: false });
    container.config({userId});
    
    container.complete();
    return container.references;
}
module.exports = { createUserSession };
