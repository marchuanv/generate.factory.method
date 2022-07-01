const utils = require('utils');
const { UserIdentity } = require('C:\\component\\lib\\useridentity.js');
function UserIdentityFactory({ userId }) {
    utils.createProperty(this, 'create', () => {
        return new UserIdentity({ userId });
    });
}
module.exports = { UserIdentityFactory };
