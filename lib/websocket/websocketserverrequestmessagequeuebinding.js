const { WebSocketServerRequestMessageQueueBinding } = require("./websocketserverrequestmessagequeuebinding.prototype");
WebSocketServerRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue  }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketServerRequestMessageQueueBinding };