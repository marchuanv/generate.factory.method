function SubscriptionMessage({ message, channelName }) {
    Object.defineProperty(this, 'getChannelName', { configurable: false, writable: false, value: () => channelName });
    Object.defineProperty(this, 'getContent', { configurable: false, writable: false, value: message.getContent });
    Object.defineProperty(this, 'getContentMetadata', { configurable: false, writable: false, value: message.getContentMetadata });
}
SubscriptionMessage.prototype.getChannelName = () => {};
module.exports = { SubscriptionMessage };
