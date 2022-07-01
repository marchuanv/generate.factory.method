const utils = require('utils');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function MessageBusFactory({ messageHandler }) {
    utils.createProperty(this, 'create', () => {
        return new MessageBus({ messageHandler });
    });
}
module.exports = { MessageBusFactory };