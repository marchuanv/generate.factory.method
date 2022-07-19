const utils = require('utils');
function MessageQueue() {
    this.Id = utils.generateGUID();
    this.messageQueueType = messageQueueType;
    let callbacks = [];
    const queue = [];
    const dequeue = (resolve) => {
        const { message } = queue.shift() || {};
        if (message && !utils.isEmptyObject(message)) {
            resolve({ message });
        }
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageQueueType }) => {
        console.log(`Queue(${this.Id}): Message Queued`);
        queue.push({ message });
        callbacks = callbacks.filter(c => c.resolved === false);
        callbacks.forEach(callback => {
            callback.action();
            callback.resolved = true;
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            callbacks.push({ resolved: false, action: () => dequeue(resolve) });
            dequeue(resolve);
        });
    }});
};
MessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
MessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
module.exports = { MessageQueue };