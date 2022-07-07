const { Address } = require('C:\\component\\lib\\address.js');
function createAddress({host,port}) {

    return new Address({host,port});
}
module.exports = { createAddress };
