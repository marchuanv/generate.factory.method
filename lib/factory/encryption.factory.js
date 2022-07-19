const { FactoryContainer } = require('./factory.container.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    let container = new FactoryContainer();
    container.add({userId});
    container.add(createUserIdentity({userId}));
    const encryption = new Encryption(container);
    container.add({encryption});
    return container;
}
module.exports = { createEncryption };
