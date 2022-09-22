const { HttpClientStoppedMessageQueueBinding } = require("./httpclientstoppedmessagequeuebinding.prototype");
HttpClientStoppedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStoppedMessageQueueBinding };
