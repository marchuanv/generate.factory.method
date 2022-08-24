const log = ({ logger, queueName, text }) => {
    logger.log({ date: new Date(), context: queueName, text });
}
function MessageQueue({ logger }) {
    const bindings = {};
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            log({ logger, queueName, text: 'waiting for queue lock' });
            setTimeout(() => dequeue({ queueName }), 1000);
            return;
        } 
        binding.locked = true;
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
        const callback = sortedCallbacks.shift();
        if (callback.peek) {
            const { message } = binding.messages[0] || { message: null };
            log({ logger, queueName, text: `peeking at messages (${binding.messages.length})` });
            try {
                await callback.resolve({ message });
            } catch(err) {
                log({ logger, queueName, text: `callback error: ${err.message}.` });
            }
        } else {
            if (binding.messages.length === 0) {
                binding.callbacks.push(callback);
                binding.locked = false;
                return;
            } else {
                log({ logger, queueName, text: `pulling message (1 of ${binding.messages.length})` });
                const { message } = binding.messages.shift() || {};
                try {
                    await callback.resolve({ message });
                } catch(err) {
                    log({ logger, queueName, text: `callback error: ${err.message}.` });
                }
            }
        }
        binding.locked = false;
        dequeue({ queueName });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        const binding = bindings[queueName];
        log({ logger, queueName, text: `message queued (1 of ${binding.messages.length})` });
        binding.messages.push({ message });
        dequeue({ queueName });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, priority, peek: false });
            log({ logger, queueName, text: `waiting for the first queued message (${binding.messages.length})` });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, priority, peek: true });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        if (!bindings[queueName]) {
            log({ logger, queueName, text: 'binding created.' });
            bindings[queueName] = { locked : false, callbacks: [], messages: [] };
        }
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ queueName }) => {
        delete bindings[queueName];
        log({ logger, queueName, text: 'binding destroyed.' });
    }});
};
MessageQueue.prototype.queueMessage = function({ message, queueName }) { };
MessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
MessageQueue.prototype.peekMessage = function ({ queueName }) { };
MessageQueue.prototype.bind = function ({ queueName }) { };
MessageQueue.prototype.unbind = function ({ queueName }) { };
module.exports = { MessageQueue };
