const { Subscription } = require('C:\\component\\lib\\subscription.js'); 
function SubscriptionFactory({ channelName }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Subscription({ channelName });
    }});
} 
module.exports = { SubscriptionFactory }; 
