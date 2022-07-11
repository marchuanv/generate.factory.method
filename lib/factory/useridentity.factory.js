const { FactoryContainer } = require('./factory.container.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId});
    
    const userIdentity = new UserIdentity(factoryContainer);
    factoryContainer.add({userIdentity});
    return factoryContainer;
}
module.exports = { createUserIdentity };
