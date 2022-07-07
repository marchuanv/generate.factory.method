
const { Subscription } = require('C:\\component\\lib\\subscription.js');
function createSubscription({channelName}) {
    
    const subscription = new Subscription({channelName});
    console.log('SubscriptionFactory: --> created Subscription');
    return {subscription};
}
module.exports = { createSubscription };
