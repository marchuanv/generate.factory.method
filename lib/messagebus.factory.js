const { MessageBus } = require('C:\\component\\lib\\messagebus.js'); 
function MessageBusFactory({ messageHandler,subscriptionFactory }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageBus({ messageHandler,subscriptionFactory });
    }});
} 
module.exports = { MessageBusFactory }; 
