const { UserIdentity } = require('C:\\component\\lib\\useridentity.js'); 
function UserIdentityFactory({  }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new UserIdentity({  });
    }});
} 
module.exports = { UserIdentityFactory }; 
