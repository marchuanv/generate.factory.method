const utils = require('utils');
function MessageQueue({ logger }) {
    const bindings = {};
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            logger.log({ date: new Date(), context: queueName, text: `${queueName}' is waiting for queue lock.` });
            setTimeout(() => dequeue({ queueName }), 1000);
            return;
        } 
        binding.locked = true;
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
        const callback = sortedCallbacks.shift();
        if (callback.peek) {
            const { message } = binding.messages[0] || { message: null };
            try {
                await callback.resolve({ message });
            } catch(err) {
                logger.log({ date: new Date(), context: queueName, text: `${queueName}' callback error: ${err.message}.` });
            }
        } else {
            if (binding.messages.length === 0) {
                binding.callbacks.push(callback);
                binding.locked = false;
                return;
            } else {
                const { message } = binding.messages.shift() || {};
                try {
                    await callback.resolve({ message });
                } catch(err) {
                    logger.log({ date: new Date(), context: queueName, text: `${queueName}' callback error: ${err.message}.` });
                }
                logger.log({ date: new Date(), context: queueName, text: `message pulled from the '${queueName}' queue.` });
            }
        }
        binding.locked = false;
        dequeue({ queueName });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        logger.log({ date: new Date(), context: queueName, text: `message published on the '${queueName}' queue.` });
        const binding = bindings[queueName];
        binding.messages.push({ message });
        dequeue({ queueName });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, priority, peek: false });
            logger.log({ date: new Date(), context: queueName, text: `subscribed to messages published on the '${queueName}' queue.` });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, priority, peek: true });
            logger.log({ date: new Date(), context: queueName, text: `subscribed to messages published on the '${queueName}' queue.` });
            dequeue({ queueName });
        });

    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        if (!bindings[queueName]) {
            bindings[queueName] = { locked : false, callbacks: [], messages: [] };
        }
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
