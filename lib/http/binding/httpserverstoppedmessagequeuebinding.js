const { HttpServerStoppedMessageQueueBinding } = require("./httpserverstoppedmessagequeuebinding.prototype");
HttpServerStoppedMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStoppedMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpServerStoppedMessageQueueBinding };
