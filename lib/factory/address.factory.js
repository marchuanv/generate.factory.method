
const { Address } = require('C:\\component\\lib\\address.js');
function createAddress({host,port}) {
    
    const address = new Address({host,port});
    return {address};
}
module.exports = { createAddress };
