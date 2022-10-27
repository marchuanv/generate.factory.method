const { HttpServerResponseMessageQueueBinding } = require("./httpserverresponsemessagequeuebinding.prototype");
HttpServerResponseMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerResponseMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
    
}
module.exports = { HttpServerResponseMessageQueueBinding };
