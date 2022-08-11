function Subscription({ event, subscriptionName }) {
    const  { createEvent } = require('./factory/event.factory.js');
    Object.defineProperty(this, 'name', { configurable: false, writable: false, value: subscriptionName });
    Object.defineProperty(this, 'event', { configurable: false, writable: false, value: event });
}
Subscription.prototype.name = '';
Subscription.prototype.event = null;
module.exports = { Subscription };
