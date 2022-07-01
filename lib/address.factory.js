const utils = require('utils');
const { Address } = require('C:\\component\\lib\\address.js');
function AddressFactory({ address,host,port }) {
    utils.createProperty(this, 'create', () => {
        return new Address({ address,host,port });
    });
}
module.exports = { AddressFactory };
