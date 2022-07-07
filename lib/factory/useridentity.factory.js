
const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function createUserIdentity({userId}) {
    
    return new UserIdentity({userId});
}
module.exports = { createUserIdentity };
