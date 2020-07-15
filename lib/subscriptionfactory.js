const { Subscription } = require('./subscription');
function SubscriptionFactory() {
    const subscriptions = [];
    Object.defineProperty(this, 'get', { writable: false, value: ({ channelName }) => {
        if (!channelName) {
            throw new Error("the 'channelName' parameter is null or undefined.");
        }
        let subscription = subscriptions.find(sub => sub.getChannelName() === channelName);
        if (subscription) {
            return subscription;
        }
        subscription = new Subscription({ channelName });
        subscriptions.push(subscription);
        return subscription;
    }});
}
SubscriptionFactory.prototype.get = ({ channelName }) => {};
module.exports = { SubscriptionFactory };