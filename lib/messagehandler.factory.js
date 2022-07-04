const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({ httpMessageHandler,webSocketMessageHandler }) {
    return new MessageHandler({ httpMessageHandler,webSocketMessageHandler });
}
module.exports = { createMessageHandler };
