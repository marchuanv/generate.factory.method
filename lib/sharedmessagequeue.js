const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    const callbacks = { locked: false };
    const queues = { locked: false };
    for(const messageQueueType of messageQueueTypes.types) {
        callbacks[messageQueueType.name] = [];
        queues[messageQueueType.name] = [];
    }
    const dequeue = ({ messageQueueType }) => {
        const sortedCallbacks = callbacks[messageQueueType].sort((x, y) => x.priority - y.priority);
        for(const callback of sortedCallbacks) {
            const { queueId, message } = queues[messageQueueType].shift() || {}; //dequeue
            if (message && !utils.isEmptyObject(message)) {
                callback.resolved = true;
                callback.resolve({ queueId, message });
            }
        }
        callbacks[messageQueueType] = callbacks[messageQueueType].filter(cb => cb.resolved === false);
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageQueueType }) => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (!queues.locked) {
                    queues.locked = true;
                    clearInterval(intervalId);
                    const queueId = utils.generateGUID();
                    queues[messageQueueType].push({ queueId, message });
                    dequeue({ messageQueueType });
                    resolve({ queueId });
                    queues.locked = false;
                }
            },100);
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (!callbacks.locked) {
                    callbacks.locked = true;
                    clearInterval(intervalId);
                    const priority = callbacks[messageQueueType].length + 1;
                    callbacks[messageQueueType].push({ resolve, resolved: false, priority });
                    dequeue({ messageQueueType });
                    callbacks.locked = false;
                }
            },100);
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
module.exports = { SharedMessageQueue };
