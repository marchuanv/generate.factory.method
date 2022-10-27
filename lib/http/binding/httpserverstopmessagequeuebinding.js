const { HttpServerStopMessageQueueBinding } = require("./httpserverstopmessagequeuebinding.prototype");
HttpServerStopMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStopMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStopMessageQueueBinding };
