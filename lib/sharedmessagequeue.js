const utils = require('utils');
function SharedMessageQueue() {
    
    const callbacks = {};
    const queues = {};

    const dequeue = async ({ messageQueueType }) => {
        const sortedCallbacks = callbacks[messageQueueType].sort((x, y) => x.priority - y.priority);
        for(const callback of sortedCallbacks) {
            const { queueId, message } = queues[messageQueueType].shift() || {}; //dequeue
            if (message && !utils.isEmptyObject(message) && !callback.resolved) {
                await callback.resolve({ queueId, message });
                callback.resolved = true;
            }
        }
        callbacks[messageQueueType] = callbacks[messageQueueType].filter(cb => cb.resolved === false);
    };
    
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, messageQueueType }) => {
        const queueId = utils.generateGUID();
        queues[messageQueueType].push({ queueId, message });
        await dequeue({ messageQueueType });
        return { queueId };
    }});

    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const priority = callbacks[messageQueueType].length + 1;
            callbacks[messageQueueType].push({ resolve, resolved: false, priority });
            dequeue({ messageQueueType });
        });
    }});

    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        callbacks[messageQueueType] = [];
        queues[messageQueueType] = [];
    }});

    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        callbacks[messageQueueType] = [];
        queues[messageQueueType] = [];
    }});

};

SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.bind = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.unbind = function ({ messageQueueType }) { };

module.exports = { SharedMessageQueue };
