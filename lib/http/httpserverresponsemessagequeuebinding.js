const { HttpServerResponseMessageQueueBinding } = require("./httpserverresponsemessagequeuebinding.prototype");
HttpServerResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerResponseMessageQueueBinding };
