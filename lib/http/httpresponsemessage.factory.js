const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.js'); 
function HttpResponseMessageFactory({ message }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpResponseMessage({ message });
    }});
} 
module.exports = { HttpResponseMessageFactory }; 
