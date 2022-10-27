const { HttpClientStopMessageQueueBinding } = require("./httpclientstopmessagequeuebinding.prototype");
HttpClientStopMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStopMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStopMessageQueueBinding };
