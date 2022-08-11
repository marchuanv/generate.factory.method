const utils = require('utils');
function SharedMessageQueue() {
    const bindings = { };
    const dequeue = async ({ messageQueueType }) => {
        const binding = bindings[messageQueueType];
        if (binding.messages.length === 0 || binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            setTimeout(() => dequeue({ messageQueueType }), 100);
        } else {
            binding.locked = true;
            const callback = binding.callbacks.sort((x, y) => x.priority - y.priority).shift();
            const { message } = binding.messages.shift(); //dequeue
            if (message && !utils.isEmptyObject(message) && !callback.resolved) {
                await callback.resolve({ message });
                callback.resolved = true;
            }
            binding.callbacks = binding.callbacks.filter(cb => cb.resolved === false);
            binding.locked = false;
            await dequeue({ messageQueueType });
        }
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, messageQueueType }) => {
        const binding = bindings[messageQueueType];
        binding.messages.push({ message });
        await dequeue({ messageQueueType });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[messageQueueType];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: messageQueueType, resolve, reject, resolved: false, priority });
            dequeue({ messageQueueType });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        bindings[messageQueueType] = { locked : false, callbacks: [], messages: [], waitCount: 0 };
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        delete bindings[messageQueueType];
    }});
    Object.defineProperty(this, 'isBinded', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        const binding = bindings[messageQueueType];
        return binding !== undefined && binding !== null;
    }});
};

SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.bind = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.unbind = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.isBinded = function ({ messageQueueType }) { };
module.exports = { SharedMessageQueue };
