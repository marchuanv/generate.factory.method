const { UserIdentity } = require('C:\\component\\lib\\useridentity.js'); 
function UserIdentityFactory({ userId }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new UserIdentity({ userId });
    }});
} 
module.exports = { UserIdentityFactory }; 
