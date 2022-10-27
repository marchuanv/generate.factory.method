const { HttpClientStopMessageQueueBinding } = require("./httpclientstopmessagequeuebinding.prototype");
HttpClientStopMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStopMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientStopMessageQueueBinding };
