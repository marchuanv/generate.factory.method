const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({ messageHandler }) {
    return new MessageBus({ messageHandler });
}
module.exports = { createMessageBus };
