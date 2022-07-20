const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    this.Id = utils.generateGUID();
    let callbacks = [];
    const queues = {};
    for(const messageQueueType of messageQueueTypes.types) {
        queues[messageQueueType.name] = [];
    }
    const dequeue = (messageType, resolve) => {
        const { message } = queues[messageType].shift() || {};
        if (message && !utils.isEmptyObject(message)) {
            resolve({ message });
            return true;
        }
        return false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageType }) => {
        queues[messageType].push({ message });
        callbacks = callbacks.filter(c => c.resolved === false);
        callbacks.filter(c => c.messageType === messageType).forEach(callback => {
            if (callback.resolve()) {
                callback.resolved = true;
            }
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageType }) => {
        return new Promise((resolve) => {
            callbacks.push({ messageType, resolved: false, resolve: () => dequeue(messageType, resolve) });
            dequeue(messageType, resolve);
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageType }) { };
module.exports = { SharedMessageQueue };
