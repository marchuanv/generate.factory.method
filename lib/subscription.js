function Subscription({ subscriptionName }) {
    Object.defineProperty(this, 'name', { configurable: false, writable: false, value: subscriptionName });
}
Subscription.prototype.name = '';
Subscription.prototype.callbackCount = 0;
module.exports = { Subscription };
