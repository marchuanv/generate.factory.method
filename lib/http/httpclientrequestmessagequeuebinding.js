const { HttpClientRequestMessageQueueBinding } = require("./httpclientrequestmessagequeuebinding.prototype");
HttpClientRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientRequestMessageQueueBinding };