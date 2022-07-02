const utils = require('utils');
const { MessageHandler } = require('D:\\component\\lib\\messagehandler.js');
function MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler }) {
    utils.createProperty(this, 'create', () => {
        return new MessageHandler({ httpMessageHandler,webSocketMessageHandler });
    });
}
module.exports = { MessageHandlerFactory };
