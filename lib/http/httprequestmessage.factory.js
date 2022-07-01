const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js'); 
function HttpRequestMessageFactory({ message }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpRequestMessage({ message });
    }});
} 
module.exports = { HttpRequestMessageFactory }; 
