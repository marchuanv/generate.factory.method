const { Encryption } = require('C:\\component\\lib\\encryption.js'); 
function EncryptionFactory({ userIdentity }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Encryption({ userIdentity });
    }});
} 
module.exports = { EncryptionFactory }; 
