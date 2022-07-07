const { Subscription } = require('C:\\component\\lib\\subscription.js');
function createSubscription({ channelName }) {
    return new Subscription({ channelName });
}
module.exports = { createSubscription };
