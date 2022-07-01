const utils = require('utils');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler }) {
    utils.createProperty(this, 'create', () => {
        return new MessageHandler({ httpMessageHandler,webSocketMessageHandler });
    });
}
module.exports = { MessageHandlerFactory };
