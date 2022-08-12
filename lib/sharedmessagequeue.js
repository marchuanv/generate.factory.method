const utils = require('utils');
function SharedMessageQueue() {
    const bindings = { };
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.messages.length === 0 || binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            setTimeout(() => dequeue({ queueName }), 100);
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
            await dequeue({ queueName });
        }
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        const binding = bindings[queueName];
        binding.messages.push({ message });
        await dequeue({ queueName });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, resolved: false, priority });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        bindings[queueName] = { locked : false, callbacks: [], messages: [], waitCount: 0 };
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ queueName }) => {
        delete bindings[queueName];
    }});
    Object.defineProperty(this, 'isBinded', { configurable: false, writable: false, value: ({ queueName }) => {
        const binding = bindings[queueName];
        return binding !== undefined && binding !== null;
    }});
};

SharedMessageQueue.prototype.queueMessage = function({ message, queueName }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
SharedMessageQueue.prototype.bind = function ({ queueName }) { };
SharedMessageQueue.prototype.unbind = function ({ queueName }) { };
SharedMessageQueue.prototype.isBinded = function ({ queueName }) { };
module.exports = { SharedMessageQueue };
