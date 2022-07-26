const utils = require('utils');
function SharedMessageQueue() {
    
    const lock = ({ queues, callbacks }) => {
        return new Promise((resolve) => {
            const intervalId = setInterval(async () => {
                const obj = (queues || callbacks);
                if (!obj.locked) {
                    obj.locked = true;
                    clearInterval(intervalId);
                    await resolve();
                    obj.locked = false;
                }
            },100);
        });
    };

    const callbacks = { locked: false };
    const queues = { locked: false };
  
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
        await lock({ queues });
        const queueId = utils.generateGUID();
        queues[messageQueueType].push({ queueId, message });
        await dequeue({ messageQueueType });
        return { queueId };
    }});

    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            lock({ queues }).then(async () => {
                const priority = callbacks[messageQueueType].length + 1;
                callbacks[messageQueueType].push({ resolve, resolved: false, priority });
                await dequeue({ messageQueueType });
            }).catch((err) => reject(err));
        });
    }});

    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: async ({ messageQueueType }) => {
        await lock({ queues });
        await lock({ callbacks });
        callbacks[messageQueueType] = [];
        queues[messageQueueType] = [];
    }});

    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: async ({ messageQueueType }) => {
        await lock({ queues });
        await lock({ callbacks });
        callbacks[messageQueueType].forEach(callback => callback.resolved = true);
        queues[messageQueueType] = [];
    }});

};

SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.bind = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.unbind = function ({ messageQueueType }) { };

module.exports = { SharedMessageQueue };
