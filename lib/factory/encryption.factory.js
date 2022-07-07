const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    const userIdentity = createUserIdentity({userId});
    return new Encryption({userIdentity});
}
module.exports = { createEncryption };
