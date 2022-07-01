const { Encryption } = require('C:\\component\\lib\\encryption.js'); 
function EncryptionFactory({ userIdentity }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Encryption({ userIdentity });
    }});
} 
module.exports = { EncryptionFactory }; 
