function SharedSubscriptions() {
    const subscriptions = [];
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ subscription }) => {
        subscriptions.push(subscription);
    }});
    Object.defineProperty(this, 'getSubscriptionCount', { configurable: false, writable: false, value: ({ eventName }) => {
        const eventSubs = subscriptions.filter(({ event }) => event.name === eventName);
        return eventSubs.length;
    }});
};
SharedSubscriptions.prototype.register = function({ subscription }) { };
SharedSubscriptions.prototype.getSubscriptionCount = function({ eventName }) { };
module.exports = { SharedSubscriptions };