const { HttpServerRequestMessageQueueBinding } = require("./httpserverrequestmessagequeuebinding.prototype");
HttpServerRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerRequestMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerRequestMessageQueueBinding };
