const { HttpClientResponseMessageQueueBinding } = require("./httpclientresponsemessagequeuebinding.prototype");
HttpClientResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientResponseMessageQueueBinding };