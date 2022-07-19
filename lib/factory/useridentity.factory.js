const factory = require('./factory.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    const container = factory.createContainer({ type: UserIdentity, variableName:'userIdentity' });
    container.config({userId});
    
    container.complete();
    return container;
}
module.exports = { createUserIdentity };
