const factory = require('./factory.js');

const { UserSecurity } = require('C:\\component\\lib\\usersecurity.js');
/**
* IsSingleton: false
* Create UserSecurity
* @param {userId}
*/
function createUserSecurity({userId}) {
    const container = factory.createContainer({ type: UserSecurity, variableName:'userSecurity', singleton: false });
    container.config({userId});
    
    container.initialise();
    return container.references;
}
module.exports = { createUserSecurity };
