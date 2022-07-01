const { Encryption } = require('C:\\component\\lib\\encryption.js'); 
function EncryptionFactory({  }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Encryption({  });
    }});
} 
module.exports = { EncryptionFactory }; 
