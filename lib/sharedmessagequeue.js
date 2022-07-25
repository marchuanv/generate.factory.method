const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    const callbacks = {};
    const queues = {};
    for(const messageQueueType of messageQueueTypes.types) {
        callbacks[messageQueueType.name] = [];
        queues[messageQueueType.name] = [];
    }
    const dequeue = ({ callback }) => {
        const { messageQueueType, resolve } = callback;
        const { queueId, message } = queues[messageQueueType].shift() || {};
        if (message && !utils.isEmptyObject(message)) {
            callback.resolved = true;
            const index = callbacks[messageQueueType].findIndex(cb => cb.resolved === true);
            callbacks[messageQueueType].splice(index, 1);
            resolve({ queueId, message });
            return true;
        }
        return false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageQueueType }) => {
        const queueId = utils.generateGUID();
        queues[messageQueueType].push({ queueId, message });
        callbacks[messageQueueType].forEach(callback => dequeue({ callback }));
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const callback = { messageQueueType, resolve, resolved: false };
            callbacks[messageQueueType].push(callback);
            dequeue({ callback });
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
module.exports = { SharedMessageQueue };
