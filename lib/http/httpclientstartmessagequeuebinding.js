const { HttpClientStartMessageQueueBinding } = require("./httpclientstartmessagequeuebinding.prototype");
HttpClientStartMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStartMessageQueueBinding };
