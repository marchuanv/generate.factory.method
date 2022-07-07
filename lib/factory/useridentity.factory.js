
const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    
    const userIdentity = new UserIdentity({userId});
    console.log('UserIdentityFactory: --> created UserIdentity');
    return {userIdentity};
}
module.exports = { createUserIdentity };
