const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js'); 
function WebSocketConnectionFactory({ host,port,websocketMessageHandlerFactory,errorMessages }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new WebSocketConnection({ host,port,websocketMessageHandlerFactory,errorMessages });
    }});
} 
module.exports = { WebSocketConnectionFactory }; 
