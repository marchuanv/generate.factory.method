const { HttpClientStartedMessageQueueBinding } = require("./httpclientstartedmessagequeuebinding.prototype");
HttpClientStartedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStartedMessageQueueBinding };