const { HttpClientResponseMessageQueueBinding } = require("./httpclientresponsemessagequeuebinding.prototype");
HttpClientResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientResponseMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientResponseMessageQueueBinding };