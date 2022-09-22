const { HttpClientStopMessageQueueBinding } = require("./httpclientstopmessagequeuebinding.prototype");
HttpClientStopMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpClientStopMessageQueueBinding };
