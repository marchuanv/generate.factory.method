
const { Subscription } = require('C:\\component\\lib\\subscription.js');
function createSubscription({channelName}) {
    
    const subscription = new Subscription({channelName});
    return {subscription};
}
module.exports = { createSubscription };
