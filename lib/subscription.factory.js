const { Subscription } = require('C:\\component\\lib\\subscription.js'); 
function SubscriptionFactory({ channelName }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Subscription({ channelName });
    }});
} 
module.exports = { SubscriptionFactory }; 
