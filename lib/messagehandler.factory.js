const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js'); 
function MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageHandler({ httpMessageHandler,webSocketMessageHandler });
    }});
} 
module.exports = { MessageHandlerFactory }; 
