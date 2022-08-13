const factory = require('./factory.js');

const { UserSecurity } = require('D:\\component\\lib\\usersecurity.js');
/**
* Create UserSecurity
* @param {userId}
*/
function createUserSecurity({userId}) {
    const container = factory.createContainer({ type: UserSecurity, variableName:'userSecurity', singleton: false });
    container.config({userId});
    
    container.complete();
    return container.references;
}
module.exports = { createUserSecurity };
