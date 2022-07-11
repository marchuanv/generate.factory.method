const { FactoryContainer } = require('./factory.container.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    let factoryContainer = new FactoryContainer();
    
    const userIdentity = new UserIdentity({userId});
    factoryContainer.add(userIdentity);
    return factoryContainer;
}
module.exports = { createUserIdentity };
