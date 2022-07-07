
const { Address } = require('C:\\component\\lib\\address.js');
function createAddress({host,port}) {
    
    const address = new Address({host,port});
    console.log('AddressFactory: --> created Address');
    return {address};
}
module.exports = { createAddress };
