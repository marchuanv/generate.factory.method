const factory = require('../factory.js');

const { UserSecurity } = require('C:\\component\\lib\\usersecurity.js');
/**
* IsSingleton: false 
* Create UserSecurity 
* @param {scopeId,userId}
*/
function createUserSecurity({scopeId,userId}) {
    let container = factory.getContainer({ scopeId, type: UserSecurity, variableName:'userSecurity', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: UserSecurity, variableName:'userSecurity', singleton: false });
        container.config({scopeId,userId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSecurity };
