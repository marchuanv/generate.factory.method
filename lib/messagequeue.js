const utils = require('utils');

const createdQueues = [];
function MessageQueue({ messageQueueType }) {
    
    this.Id = utils.generateGUID();
    const referencedQueues = [];
    const callbacks = [];
    const queue = [];

    createdQueues.push({ Id: this.Id, messageQueueType, reference: this });
    
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message }) => {
        queue.push({ message });
        callbacks.forEach(callback => callback());
        callbacks.forEach(callback => callback());
        referencedQueues.forEach(refQ => refQ.queueMessage({ message }));
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
    Object.defineProperty(this, 'enableSync', { configurable: false, writable: false, value: () => {
      const matchingQueues = createdQueues.find(q => q.messageQueueType === messageQueueType);
    }});
};

MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
MessageQueue.prototype.enableSync = function () { };
module.exports = { MessageQueue };