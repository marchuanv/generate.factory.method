const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({timeout,hostAddress}) {
    const messageHandler = createMessageHandler({timeout,hostAddress});
    const messageBus = new MessageBus({messageHandler});
    return {messageHandler,messageBus};
}
module.exports = { createMessageBus };
