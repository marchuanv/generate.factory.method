const factory = require('./factory.js');

const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    let container = factory.createContainer(UserIdentity);
    container.add({userId});
    
    const userIdentity = new UserIdentity(container);
    container.add({userIdentity});
    return container;
}
module.exports = { createUserIdentity };
