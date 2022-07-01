const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js'); 
function HttpMessageHandlerFactory({ httpConnection,httpMessageQueue }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpMessageHandler({ httpConnection,httpMessageQueue });
    }});
} 
module.exports = { HttpMessageHandlerFactory }; 
