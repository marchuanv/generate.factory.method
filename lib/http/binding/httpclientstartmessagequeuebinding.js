const { HttpClientStartMessageQueueBinding } = require("./httpclientstartmessagequeuebinding.prototype");
HttpClientStartMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStartMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStartMessageQueueBinding };
