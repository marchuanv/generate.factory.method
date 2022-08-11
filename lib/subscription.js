function Subscription({ subscriptionName }) {
    Object.defineProperty(this, 'name', { configurable: false, writable: false, value: subscriptionName });
    Object.defineProperty(this, 'callbackCount', { configurable: false, writable: false, value: 0 });
}
Subscription.prototype.name = '';
Subscription.prototype.callbackCount = 0;
module.exports = { Subscription };
