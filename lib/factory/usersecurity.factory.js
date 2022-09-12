const { Factory } = require('../factory.js');
const factory = new Factory();

const { UserSecurity } = require('C:\\component\\lib\\usersecurity.prototype.js');
const getUserSecurityFactoryConfig = require('C:\\component\\lib\\factory\\usersecurity.factory.config.js');
/**
* IsSingleton: false 
* Create UserSecurity 
* @param {scopeId,userId}
*/
function createUserSecurity({scopeId,userId}) {
    const container = factory.getContainer({ scopeId, type: UserSecurity, variableName:'userSecurity', singleton: false });
    container.config(getUserSecurityFactoryConfig());
    container.reference({userId});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createUserSecurity };
