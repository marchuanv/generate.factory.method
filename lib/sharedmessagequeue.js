const utils = require('utils');
function SharedMessageQueue() {
    console.log(`queue ${utils.generateGUID()} created.`);
    const callbacks = { };
    const queues = { };
    const dequeue = async ({ messageQueueType }) => {
        const queue = queues[messageQueueType].queue;
        if (queue.length === 0) {
            return;
        }
        if (queues[messageQueueType].queue.lock) {
            setTimeout(() => dequeue({ messageQueueType }), 100);
        } else {
            queues[messageQueueType].queue.lock = true;
            const sortedCallbacks = callbacks[messageQueueType].queue.sort((x, y) => x.priority - y.priority);
            for(const callback of sortedCallbacks) {
                console.log(`dequeuing 1 of ${ queue.length } messages from the ${messageQueueType} queue.`);
                const { queueId, message } = queue.shift(); //dequeue
                if (message && !utils.isEmptyObject(message) && !callback.resolved) {
                    await callback.resolve({ queueId, message });
                    callback.resolved = true;
                }
            }
            queues[messageQueueType].queue.lock = false;
        }
        callbacks[messageQueueType].queue = callbacks[messageQueueType].queue.filter(cb => cb.resolved === false);
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, messageQueueType }) => {
        const queueId = utils.generateGUID();
        queues[messageQueueType].queue.push({ queueId, message });
        await dequeue({ messageQueueType });
        return { queueId };
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve) => {
            const priority = callbacks[messageQueueType].queue.length + 1;
            callbacks[messageQueueType].queue.push({ resolve, resolved: false, priority });
            dequeue({ messageQueueType });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        callbacks[messageQueueType] = { lock : false, queue: [] };
        queues[messageQueueType] = { lock : false, queue: [] }; 
    }});
};

SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.bind = function ({ messageQueueType }) { };

module.exports = { SharedMessageQueue };
