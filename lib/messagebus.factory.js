const { MessageBus } = require('C:\\component\\lib\\messagebus.js'); 
function MessageBusFactory({ messageHandler,subscriptionFactory }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageBus({ messageHandler,subscriptionFactory });
    }});
} 
module.exports = { MessageBusFactory }; 
