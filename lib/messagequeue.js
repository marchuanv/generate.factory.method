const utils = require('utils');
function MessageQueue({ messageQueueType, messageQueueArray }) {
    this.Id = utils.generateGUID();
    this.messageQueueType = messageQueueType;
    const callbacks = [];
    const queue = messageQueueArray || [];
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message }) => {
        console.log(`Queue(${this.Id}): Message Queued`);
        queue.push({ message });
        callbacks.forEach(callback => callback());
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: () => {
        const dequeue = (resolve) => {
            const { message } = queue.shift() || {};
            if (message && !utils.isEmptyObject(message)) {
                resolve({ message });
            }
        };
        return new Promise((resolve) => {
            callbacks.push(() => dequeue(resolve));
            dequeue(resolve);
        });
    }});
};
MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
module.exports = { MessageQueue };