const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js'); 
function WebSocketConnectionFactory({ host,port,websocketMessageHandlerFactory,errorMessages }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new WebSocketConnection({ host,port,websocketMessageHandlerFactory,errorMessages });
    }});
} 
module.exports = { WebSocketConnectionFactory }; 
