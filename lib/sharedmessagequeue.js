const utils = require('utils');
function SharedMessageQueue() {
    console.log(`queue ${utils.generateGUID()} created.`);
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
            console.log(`dequeuing callback from ${callback.Id}`);
            console.log(`dequeuing 1 of ${ binding.messages.length } messages from the ${messageQueueType} queue.`);
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
        console.log(`queuing 1 message onto the ${messageQueueType} queue.`);
        const binding = bindings[messageQueueType];
        binding.messages.push({ message });
        await dequeue({ messageQueueType });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[messageQueueType];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: messageQueueType, resolve, reject, resolved: false, priority });
            console.log(`waiting for a message on the ${messageQueueType} queue.`);
            dequeue({ messageQueueType });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ messageQueueType }) => {
        const binding = bindings[messageQueueType];
        if (binding) {
            if (binding.callbacks.length > 0) {
                if (binding.waitCount  === 3) {
                    for(let i = 0; i < binding.callbacks.length; i++) {
                        binding.callbacks[i].resolved = true;
                    }
                    binding.callbacks = binding.callbacks.filter(cb => cb.resolved === false);
                    binding.waitCount = 0;
                    binding.locked = false;
                } else {
                    binding.waitCount = binding.waitCount + 1;
                    binding.locked = true;
                    setTimeout(() => this.bind({ messageQueueType }),500);
                }
                return;
            }
        } else {
            bindings[messageQueueType] = { locked : false, callbacks: [], messages: [], waitCount: 0 };
        }
    }});
};

SharedMessageQueue.prototype.queueMessage = function({ message, messageQueueType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageQueueType }) { };
SharedMessageQueue.prototype.bind = function ({ messageQueueType }) { };

module.exports = { SharedMessageQueue };
