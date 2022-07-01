const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.js'); 
function HttpRequestMessageFactory({ message }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpRequestMessage({ message });
    }});
} 
module.exports = { HttpRequestMessageFactory }; 
