const { HttpClientRequestMessageQueueBinding } = require("./httpclientrequestmessagequeuebinding.prototype");
HttpClientRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientRequestMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientRequestMessageQueueBinding };