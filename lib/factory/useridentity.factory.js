const factory = require('./factory.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
/**
* Create UserIdentity
* @param {userId}
*/
function createUserIdentity({userId}) {
    const container = factory.createContainer({ type: UserIdentity, variableName:'userIdentity', singleton: false });
    container.config({userId});
    
    container.complete();
    return container.references;
}
module.exports = { createUserIdentity };
