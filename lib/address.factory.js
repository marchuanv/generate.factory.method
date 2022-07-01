const { Address } = require('C:\\component\\lib\\address.js'); 
function AddressFactory({ address,host,port }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Address({ address,host,port });
    }});
} 
module.exports = { AddressFactory }; 
