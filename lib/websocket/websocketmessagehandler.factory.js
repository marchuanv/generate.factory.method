const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js'); 
function WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new WebSocketMessageHandler({ websocketConnection,websocketMessageQueue });
    }});
} 
module.exports = { WebSocketMessageHandlerFactory }; 
