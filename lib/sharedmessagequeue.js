const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    this.Id = utils.generateGUID();
    let callbacks = {};
    const queues = {};
    for(const messageQueueType of messageQueueTypes.types) {
        callbacks[messageQueueType.name] = [];
        queues[messageQueueType.name] = [];
    }
    const dequeue = ({ callback }) => {
        const { messageQueueType, resolve } = callback;
        const { message } = queues[messageQueueType].shift() || {};
        if (message && !utils.isEmptyObject(message)) {
            callback.resolved = true;
            resolve({ message });
            const index = callbacks[messageQueueType].indexOf(cb => cb.resolved);
            callbacks[messageQueueType].splice(index, 1);
            return true;
        }
        return false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageQueueType }) => {
        queues[messageQueueType].push({ message });
        callbacks[messageQueueType].forEach(callback => dequeue({ callback }));
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const callback = { messageQueueType, resolve };
            callbacks[messageQueueType].push(callback);
            dequeue({ callback });
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
module.exports = { SharedMessageQueue };
