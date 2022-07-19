const { FactoryContainer } = require('./factory.container.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    let container = new FactoryContainer();
    container.add({userId});
    
    const userIdentity = new UserIdentity(container);
    container.add({userIdentity});
    return container;
}
module.exports = { createUserIdentity };
