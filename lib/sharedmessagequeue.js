const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    const callbacks = {};
    const queues = {};
    for(const messageQueueType of messageQueueTypes.types) {
        callbacks[messageQueueType.name] = [];
        queues[messageQueueType.name] = [];
    }
    const dequeue = ({ callback }) => {
        const { messageQueueType, resolve, priority, Id } = callback;
        if (callbacks[messageQueueType].find(cb => cb.Id !== Id && cb.priority < priority) === undefined) { //if other callbacks have higher priority don't dequeue
            const { queueId, message } = queues[messageQueueType].shift() || {}; //dequeue
            if (message && !utils.isEmptyObject(message)) {
                callback.resolved = true;
                const index = callbacks[messageQueueType].findIndex(cb => cb.resolved === true);
                callbacks[messageQueueType].splice(index, 1);
                resolve({ queueId, message });
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageQueueType }) => {
        const queueId = utils.generateGUID();
        queues[messageQueueType].push({ queueId, message });
        callbacks[messageQueueType].forEach(callback => dequeue({ callback }));
        return { queueId };
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const callback = { 
                Id: utils.generateGUID(),
                messageQueueType,
                resolve,
                resolved: false,
                priority: callbacks[messageQueueType].length + 1
            };
            callbacks[messageQueueType].push(callback);
            dequeue({ callback });
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
module.exports = { SharedMessageQueue };
