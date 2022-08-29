const utils = require("utils");

const log = ({ logger, binding, text }) => {
    logger.log({ date: new Date(), context: binding.name, text });
}
function MessageQueue({ logger }) {
    const bindings = { };
    const dequeue = async ({ binding }) => {
        if (binding.locked) {
            log({ logger, binding, text: 'waiting for queue lock' });
            setTimeout(() => dequeue({ binding }), 1000);
            return;
        }
        binding.locked = true;

        if (binding.callbacks.length === 0) {
            binding.locked = false;
            return;
        }
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
        const callback = sortedCallbacks.shift();
        if (callback.peek) {
            const { message } = binding.messages[0] || { message: null };
            log({ logger, binding, text: `peeking at messages (${binding.messages.length})` });
            try {
                await callback.resolve({ message });
            } catch(err) {
                log({ logger, binding, text: `callback error: ${err.message}.` });
            }
        } else {
            if (binding.messages.length === 0) {
                binding.callbacks.push(callback);
                binding.locked = false;
                return;
            } else {
                log({ logger, binding, text: `pulling message (1 of ${binding.messages.length})` });
                const { message } = binding.messages.shift() || {};
                try {
                    await callback.resolve({ message });
                } catch(err) {
                    log({ logger, binding, text: `callback error: ${err.message}.` });
                }
            }
        }
        binding.locked = false;
        dequeue({ binding });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        const Id = utils.generateGUID();
        const binding = bindings[queueName];
        binding.messages.push({ Id, queueName, message });
        dequeue({ binding });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            const binding = bindings[queueName];
            binding.callbacks.push({ Id, queueName, resolve, peek: false });
            dequeue({ binding });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            const binding = bindings[queueName];
            binding.callbacks.push({ Id, queueName, resolve, peek: true });
            dequeue({ binding });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ bindingObj }) => {
        const type = bindingObj.constructor;
        const queueName = type.name;
        Object.defineProperty(bindingObj, 'name', { configurable: false, writable: false, value: queueName });
        Object.defineProperty(bindingObj, 'messages', { configurable: false, writable: false, value: [] });
        Object.defineProperty(bindingObj, 'callbacks', { configurable: false, writable: false, value: [] });
        Object.defineProperty(bindingObj, 'queueMessage', { configurable: false, writable: true, value: async ({ message }) => {
            await this.queueMessage({ message, queueName });
        }});
        Object.defineProperty(bindingObj, 'dequeueMessage', { configurable: false, writable: true, value: async () => {
            return await this.dequeueMessage({ queueName });
        }});
        Object.defineProperty(bindingObj, 'peekMessage', { configurable: false, writable: true, value: async () => {
            return await this.peekMessage({ queueName });
        }});
        Object.defineProperty(bindingObj, 'unbind', { configurable: false, writable: false, value: () => {
            Object.defineProperty(bindingObj, 'queueMessage', { configurable: false, writable: true, value: ({ message }) => {
                log({ logger, queueName, text: 'unbinded and not queueing messages anymore.' });
            }});
            Object.defineProperty(bindingObj, 'dequeueMessage', { configurable: false, writable: true, value: () => {
                return new Promise(() => {
                    log({ logger, queueName, text: 'unbinded and not dequeueing messages anymore.' });
                });
            }});
            Object.defineProperty(bindingObj, 'peekMessage', { configurable: false, writable: true, value: () => {
                return new Promise(() => {
                    log({ logger, queueName, text: 'unbinded and not peeking at messages anymore.' });
                });
            }});
            this.unbind({ queueName });
        }});
        bindings[queueName] = bindingObj;
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ queueName }) => {
        delete bindings[queueName];
    }});
};
MessageQueue.prototype.queueMessage = function({ message, queueName }) { };
MessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
MessageQueue.prototype.peekMessage = function ({ queueName }) { };
MessageQueue.prototype.bind = function ({ queueName }) { };
MessageQueue.prototype.unbind = function ({ queueName }) { };
module.exports = { MessageQueue };
