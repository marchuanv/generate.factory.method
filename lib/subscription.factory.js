const utils = require('utils');
const { Subscription } = require('D:\\component\\lib\\subscription.js');
function SubscriptionFactory({ channelName }) {
    utils.createProperty(this, 'create', () => {
        return new Subscription({ channelName });
    });
}
module.exports = { SubscriptionFactory };
