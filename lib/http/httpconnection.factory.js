const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js'); 
function HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpConnection({ httpMessageQueue,hostAddress,timeout });
    }});
} 
module.exports = { HttpConnectionFactory }; 
