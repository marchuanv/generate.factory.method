const utils = require('utils');
function MessageQueue({ sharedMessageQueues, messageQueueType }) {
    this.Id = utils.generateGUID();
    this.messageQueueType = messageQueueType;
    const callbacks = [];
    const queue = [];
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message }) => {
        queue.push({ message });
        callbacks.forEach(callback => callback());
        sharedMessageQueues.references().forEach(refQ => refQ.queueMessage({ message }));
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: () => {
        return new Promise((resolve) => {
            callbacks.push(() => {
                const { message } = queue.shift() || {};
                if (message && !utils.isEmptyObject(message)) {
                    resolve({ message });
                }
            })
        });
    }});
};
MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
module.exports = { MessageQueue };