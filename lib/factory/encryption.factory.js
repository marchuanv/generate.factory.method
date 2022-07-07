const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({ userIdentity }) {
    return new Encryption({ userIdentity });
}
module.exports = { createEncryption };
