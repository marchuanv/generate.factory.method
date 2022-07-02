const utils = require('utils');
const { Address } = require('D:\\component\\lib\\address.js');
function AddressFactory({ host,port }) {
    utils.createProperty(this, 'create', () => {
        return new Address({ host,port });
    });
}
module.exports = { AddressFactory };
