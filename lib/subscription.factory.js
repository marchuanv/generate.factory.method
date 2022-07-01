const utils = require('utils');
const { Subscription } = require('C:\\component\\lib\\subscription.js');
function SubscriptionFactory({ channelName }) {
    utils.createProperty(this, 'create', () => {
        return new Subscription({ channelName });
    });
}
module.exports = { SubscriptionFactory };
