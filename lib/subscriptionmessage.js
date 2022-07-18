function SubscriptionMessage({ message, channelName }) {
    Object.defineProperty(this, 'getChannelName', { configurable: false, writable: false, value: () => channelName });
}
SubscriptionMessage.prototype.getChannelName = () => {};
module.exports = { SubscriptionMessage };
