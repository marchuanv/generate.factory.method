function SharedEventSubscriptions() {
    const eventSubscriptions = [];
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ event, subscription }) => {
        eventSubscriptions.push({ event, subscription });
    }});
    Object.defineProperty(this, 'setCallbackCount', { configurable: false, writable: false, value: ({ event, subscription, callbackCount }) => {
        const eventName = event.name;
        const subName = subscription.name;
        {
            const { subscription } = eventSubscriptions.find(({ event, subscription }) => event.name === eventName && subscription.name === subName);
            subscription.callbackCount = callbackCount;
        }
    }});
    Object.defineProperty(this, 'getTotalCallbackCount', { configurable: false, writable: false, value: ({ event }) => {
        const eventName = event.name;
        {
            const eventSubs = eventSubscriptions.filter(({ event }) => event.name === eventName);
            return eventSubs.reduce((count, { subscription }) => {
                count = count + subscription.callbackCount;
                return count;
            },0);
        }
    }});
    Object.defineProperty(this, 'getTotalSubscriptionCount', { configurable: false, writable: false, value: ({ event }) => {
        const eventName = event.name;
        {
            const eventSubs = eventSubscriptions.filter(({ event }) => event.name === eventName);
            return eventSubs.length;
        }
    }});
};
SharedEventSubscriptions.prototype.register = function({ event, subscription }) { };
SharedEventSubscriptions.prototype.setCallbackCount = function({ event, subscription, callbackCount }) { };
SharedEventSubscriptions.prototype.getTotalCallbackCount = function({ event }) { };
SharedEventSubscriptions.prototype.getTotalSubscriptionCount = function({ name }) { };
module.exports = { SharedEventSubscriptions };