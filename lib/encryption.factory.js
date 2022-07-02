const utils = require('utils');
const { Encryption } = require('D:\\component\\lib\\encryption.js');
function EncryptionFactory({ userIdentity }) {
    utils.createProperty(this, 'create', () => {
        return new Encryption({ userIdentity });
    });
}
module.exports = { EncryptionFactory };
