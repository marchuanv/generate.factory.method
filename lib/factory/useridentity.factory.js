
const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    
    const userIdentity = new UserIdentity({userId});
    return {userIdentity};
}
module.exports = { createUserIdentity };
