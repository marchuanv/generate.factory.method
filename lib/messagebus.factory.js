const { MessageBus } = require('C:\\component\\lib\\messagebus.js'); 
function MessageBusFactory({ messageHandler }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageBus({ messageHandler });
    }});
} 
module.exports = { MessageBusFactory }; 
