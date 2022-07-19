const utils = require('utils');

const allQueues = [];
function MessageQueue({ messageQueueType, isSyncedMessageQueueTypes }) {
    
    this.Id = utils.generateGUID();
    let referencedQueues = [];
    const callbacks = [];
    const queue = [];

    allQueues.push({ Id: this.Id, messageQueueType, reference: this });

    if (isSyncedMessageQueueTypes) {
        const matchingQueueTypes = allQueues.filter(q => q.Id !== this.Id && q.messageQueueType.code === messageQueueType.code);
        referencedQueues = referencedQueues.concat(matchingQueueTypes);
    }
    
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message }) => {
        queue.push({ message });
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
};

MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
module.exports = { MessageQueue };