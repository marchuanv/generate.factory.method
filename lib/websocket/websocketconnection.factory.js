const utils = require('utils');
const { WebSocketConnection } = require('D:\\component\\lib\\websocket\\websocketconnection.js');
function WebSocketConnectionFactory({ host,port }) {
    utils.createProperty(this, 'create', () => {
        return new WebSocketConnection({ host,port });
    });
}
module.exports = { WebSocketConnectionFactory };
