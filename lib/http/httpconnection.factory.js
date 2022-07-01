const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js'); 
function HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpConnection({ httpMessageQueue,hostAddress,timeout });
    }});
} 
module.exports = { HttpConnectionFactory }; 
