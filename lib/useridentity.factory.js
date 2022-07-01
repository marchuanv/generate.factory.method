const { UserIdentity } = require('C:\\component\\lib\\useridentity.js'); 
function UserIdentityFactory({ userId }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new UserIdentity({ userId });
    }});
} 
module.exports = { UserIdentityFactory }; 
