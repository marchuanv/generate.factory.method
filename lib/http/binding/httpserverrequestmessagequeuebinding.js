const { HttpServerRequestMessageQueueBinding } = require("./httpserverrequestmessagequeuebinding.prototype");
HttpServerRequestMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerRequestMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpServerRequestMessageQueueBinding };
