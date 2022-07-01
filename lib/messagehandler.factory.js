const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js'); 
function MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageHandler({ httpMessageHandler,webSocketMessageHandler,httpMessageFactory,webSocketMessageFactory });
    }});
} 
module.exports = { MessageHandlerFactory }; 
