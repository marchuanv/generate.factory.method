const { HttpServerStopMessageQueueBinding } = require("./httpserverstopmessagequeuebinding.prototype");
HttpServerStopMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStopMessageQueueBinding };
