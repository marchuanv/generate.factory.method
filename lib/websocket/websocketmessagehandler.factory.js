const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js'); 
function WebSocketMessageHandlerFactory({ messageFactory,errorMessages,connection }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new WebSocketMessageHandler({ messageFactory,errorMessages,connection });
    }});
} 
module.exports = { WebSocketMessageHandlerFactory }; 
