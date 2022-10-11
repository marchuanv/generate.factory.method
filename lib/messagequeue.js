const utils = require("utils");
const log = ({ logger, binding, text }) => {
    logger.log({ date: new Date(), context: binding.name, text });
}
const { MessageQueue } = require("./messagequeue.prototype");
MessageQueue.prototype.constructor = function({ logger }) {
    const bindings = { };
    const dequeue = async ({ binding }) => {
        if (binding.callbacks.length === 0 || binding.messages.length === 0) {
            return;
        }
        if (binding.locked) {
            log({ logger, binding, text: 'waiting for queue lock' });
            setTimeout(() => dequeue({ binding }), 1000);
            return;
        }
        binding.locked = true;
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
        const callback = sortedCallbacks.shift();
        log({ logger, binding, text: `pulling message (1 of ${binding.messages.length})` });
        const { message } = binding.messages.shift();
        try {
            await callback.resolve({ message });
        } catch(err) {
            log({ logger, binding, text: `callback error: ${ err.message }.` });
        }
        binding.locked = false;
        dequeue({ binding });
    };
    const peek = async ({ binding }) => {
        if (binding.peekCallbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            log({ logger, binding, text: 'waiting for queue lock' });
            setTimeout(() => peek({ binding }), 1000);
            return;
        }
        binding.locked = true;
        log({ logger, binding, text: `peeking at first message (1 of ${binding.messages.length})` });
        const { message } = binding.messages[binding.messages.length-1] || { message: null };
        try {
            const callback = binding.peekCallbacks.shift();
            await callback.resolve({ message });
        } catch(err) {
            log({ logger, binding, text: `callback error: ${err.message}.` });
        }
        binding.locked = false;
        peek({ binding });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        const Id = utils.generateGUID();
        const binding = bindings[queueName];
        log({ logger, binding, text: `pushing message (1 of ${binding.messages.length})` });
        binding.messages.push({ Id, queueName, message });
        peek({ binding });
        dequeue({ binding });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            const binding = bindings[queueName];
            const priority = (binding.callbacks.length -1 ) + 1;
            binding.callbacks.push({ Id, queueName, resolve, priority });
            dequeue({ binding });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            const binding = bindings[queueName];
            binding.peekCallbacks.push({ Id, queueName, resolve });
            peek({ binding });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ factoryContainerBindingName, bindingObj }) => {
        const queueName = `${factoryContainerBindingName}_${bindingObj.name}`;
        Object.defineProperty(bindingObj, 'name', { configurable: false, writable: false, value: queueName });
        Object.defineProperty(bindingObj, 'messages', { configurable: false, writable: false, value: [] });
        Object.defineProperty(bindingObj, 'callbacks', { configurable: false, writable: false, value: [] });
        Object.defineProperty(bindingObj, 'peekCallbacks', { configurable: false, writable: false, value: [] });
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
            Object.defineProperty(bindingObj, 'queueMessage', { configurable: false, writable: true, value: () => {
                log({ logger, binding: bindingObj, text: 'unbinded and not queueing messages anymore.' });
            }});
            Object.defineProperty(bindingObj, 'dequeueMessage', { configurable: false, writable: true, value: () => {
                return new Promise(() => {
                    log({ logger, binding: bindingObj, text: 'unbinded and not dequeueing messages anymore.' });
                });
            }});
            Object.defineProperty(bindingObj, 'peekMessage', { configurable: false, writable: true, value: () => {
                return new Promise(() => {
                    log({ logger, binding: bindingObj, text: 'unbinded and not peeking at messages anymore.' });
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
module.exports = { MessageQueue };
