const { HttpServerStopMessageQueueBinding } = require("./httpserverstopmessagequeuebinding.prototype");
HttpServerStopMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStopMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpServerStopMessageQueueBinding };
