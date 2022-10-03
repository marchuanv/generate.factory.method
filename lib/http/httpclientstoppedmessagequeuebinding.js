const { HttpClientStoppedMessageQueueBinding } = require("./httpclientstoppedmessagequeuebinding.prototype");
HttpClientStoppedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStoppedMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStoppedMessageQueueBinding };
