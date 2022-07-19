const factory = require('./factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    let container = factory.createContainer(Encryption);
    container.add({userId});
    container.add(createUserIdentity({userId}));
    const encryption = new Encryption(container);
    container.add({encryption});
    return container;
}
module.exports = { createEncryption };
