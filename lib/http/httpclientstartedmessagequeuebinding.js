const { HttpClientStartedMessageQueueBinding } = require("./httpclientstartedmessagequeuebinding.prototype");
HttpClientStartedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStartedMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStartedMessageQueueBinding };