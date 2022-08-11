function Subscription({ subscriptionName }) {
    Object.defineProperty(this, 'name', { configurable: false, writable: false, value: subscriptionName });
    this.callbackCount = 0;
}
Subscription.prototype.name = '';
Subscription.prototype.callbackCount = 0;
module.exports = { Subscription };
