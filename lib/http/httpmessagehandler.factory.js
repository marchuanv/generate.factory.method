const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js'); 
function HttpMessageHandlerFactory({ httpConnection,httpMessageQueue }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpMessageHandler({ httpConnection,httpMessageQueue });
    }});
} 
module.exports = { HttpMessageHandlerFactory }; 
