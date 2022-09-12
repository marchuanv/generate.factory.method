const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSecurity } = require('C:\\component\\lib\\usersecurity.js');
/**
* IsSingleton: false 
* Create UserSecurity 
* @param {scopeId,userId}
*/
function createUserSecurity({scopeId,userId}) {
    let container = factory.getContainer({ scopeId, type: UserSecurity, variableName:'userSecurity', singleton: false });
    container.config({userId});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSecurity };
