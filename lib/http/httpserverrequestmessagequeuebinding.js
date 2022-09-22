const { HttpServerRequestMessageQueueBinding } = require("./httpserverrequestmessagequeuebinding.prototype");
HttpServerRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerRequestMessageQueueBinding };
