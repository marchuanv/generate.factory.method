const { HttpServerResponseMessageQueueBinding } = require("./httpserverresponsemessagequeuebinding.prototype");
HttpServerResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerResponseMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
    
}
module.exports = { HttpServerResponseMessageQueueBinding };
