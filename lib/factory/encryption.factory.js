const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    const {userIdentity} = createUserIdentity({userId});
    const encryption = new Encryption({userIdentity});
    return {userIdentity,encryption};
}
module.exports = { createEncryption };
