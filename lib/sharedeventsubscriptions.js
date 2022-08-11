function SharedEventSubscriptions() {
    const eventSubscriptions = [];
    Object.defineProperty(this, 'register', { configurable: false, writable: false, value: ({ event, subcription }) => {
        eventSubscriptions.push({ event, subcription });
    }});
    Object.defineProperty(this, 'setCallbackCount', { configurable: false, writable: false, value: ({ event, subcription, callbackCount }) => {
        const eventName = event.name;
        const subName = subcription.name;
        {
            const { subcription } = eventSubscriptions.find(({ event, subcription }) => event.name === eventName && subcription.name === subName);
            subcription.callbackCount = callbackCount;
        }
    }});
    Object.defineProperty(this, 'getTotalCallbackCount', { configurable: false, writable: false, value: ({ event }) => {
        const eventName = event.name;
        {
            const eventSubs = eventSubscriptions.filter(({ event }) => event.name === eventName);
            return eventSubs.reduce((count, count2) => {
                return count + count2;
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
SharedEventSubscriptions.prototype.register = function({ event, subcription }) { };
SharedEventSubscriptions.prototype.setCallbackCount = function({ event, subcription, callbackCount }) { };
SharedEventSubscriptions.prototype.getTotalCallbackCount = function({ event }) { };
SharedEventSubscriptions.prototype.getSubscriptionCount = function({ name }) { };
module.exports = { SharedEventSubscriptions };