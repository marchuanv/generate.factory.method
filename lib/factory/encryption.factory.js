const { FactoryContainer } = require('./factory.container.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createUserIdentity({userId}));
    const encryption = new Encryption({userIdentity});
    factoryContainer.add(encryption);
    return factoryContainer;
}
module.exports = { createEncryption };
