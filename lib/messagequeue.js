const utils = require("utils");

const log = ({ logger, queueName, text }) => {
    logger.log({ date: new Date(), context: queueName, text });
}
function MessageQueue({ logger }) {
    
    let callbacks = [];
    let messages = [];
    const bindings = { binding: { messages: [], locked: false }, unbinding: { messages: [], locked: false } };

    const dequeue = async ({ queueName }) => {

       // log({ logger, queueName, text: `waiting for the first queued message (${binding.messages.length})` });
       // log({ logger, queueName, text: `message queued (1 of ${binding.messages.length})` });
       // const priority = binding.callbacks.length + 1;

        let binding = bindings[queueName];
        if (binding) {
            if (binding.locked) {
                log({ logger, queueName, text: 'waiting for queue lock' });
                setTimeout(() => dequeue({ queueName }), 1000);
                return;
            }
            binding.locked = true;
            if (queueName === 'unbinding') {
                binding.messages = binding.messages.concat(messages.filter(m => m.queueName === queueName));
                messages = messages.filter(m1 => binding.messages.find(m2 => m2.Id === m1.Id) === undefined);
                const { message } = binding.messages.shift() || { message: null };
                if (!message) {
                    binding.locked = false;
                    return;
                }
                {
                    const { queueName } = message;
                    log({ logger, queueName, text: 'unbinded.' });
                    delete bindings[queueName];
                }
                binding.locked = false;
                dequeue({ queueName });
                return;
            } else if (queueName === 'binding') {
                binding.messages = binding.messages.concat(messages.filter(m => m.queueName === queueName));
                messages = messages.filter(m1 => binding.messages.find(m2 => m2.Id === m1.Id) === undefined);
                const { message } = binding.messages.shift() || { message: null };
                if (!message) {
                    binding.locked = false;
                    return;
                }
                {
                    const { queueName } = message;
                    log({ logger, queueName, text: `binded.` });
                    if (!bindings[queueName]) {
                        bindings[queueName] = { callbacks: [], messages:[], locked: false };
                    }
                }
                binding.locked = false;
                dequeue({ queueName });
                return;
            }

        } else {
            log({ logger, queueName, text: 'waiting for binding creation' });
            setTimeout(() => dequeue({ queueName }), 1000);
            return;
        }

        binding.callbacks = binding.callbacks.concat(callbacks.filter(c => c.queueName === queueName));
        binding.messages = binding.messages.concat(messages.filter(m => m.queueName === queueName));
        callbacks = callbacks.filter(c1 => binding.callbacks.find(c2 => c2.Id === c1.Id) === undefined);
        messages = messages.filter(m1 => binding.messages.find(m2 => m2.Id === m1.Id) === undefined);

        if (binding.callbacks.length === 0) {
            binding.locked = false;
            return;
        }
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
        const Id = utils.generateGUID();
        messages.push({ Id, queueName, message });
        dequeue({ queueName });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            callbacks.push({ Id, queueName, resolve, peek: false });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve) => {
            const Id = utils.generateGUID();
            callbacks.push({ Id, queueName, resolve, peek: true });
            dequeue({ queueName });
        });
    }});
  
};
MessageQueue.prototype.queueMessage = function({ message, queueName }) { };
MessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
MessageQueue.prototype.peekMessage = function ({ queueName }) { };
module.exports = { MessageQueue };
