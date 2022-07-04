const utils = require('utils');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function WebSocketMessageHandlerFactory({ websocketConnection,websocketMessageQueue }) {
    utils.createProperty(this, 'create', () => {
        return new WebSocketMessageHandler({ websocketConnection,websocketMessageQueue });
    });
}
module.exports = { WebSocketMessageHandlerFactory };
