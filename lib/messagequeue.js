const utils = require('utils');
function MessageQueue({ scopeId, logger }) {
    const bindings = {};
    const onceOffMsgHistory = [];
    const defaultQueueName = scopeId;
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            logger.log({ date: new Date(), context: queueName, text: `${scopeId}: '${queueName}' is waiting for queue lock.` });
            setTimeout(() => dequeue({ queueName }), 1000);
            return;
        } 
        binding.locked = true;
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
        const callback = sortedCallbacks.shift();
        if (callback) {
            if (callback.peek) {
                const { message } = binding.messages[0] || { message: null };
                await callback.resolve({ message });
            } else {
                if (binding.messages.length === 0) {
                    binding.callbacks.push(callback);
                    binding.locked = false;
                    return;
                } else {
                    const { message, isOnceOff } = binding.messages.shift() || {};
                    if (isOnceOff) {
                        const base64String = utils.stringToBase64(utils.getJSONString(message));
                        if (onceOffMsgHistory.find(base64Str => base64Str ===  base64String)) {
                            binding.locked = false;
                            return;
                        }
                        onceOffMsgHistory.push(base64String)
                    }
                    await callback.resolve({ message });
                    logger.log({ date: new Date(), context: queueName, text: `${scopeId}: message pulled from the '${queueName}' queue.` });
                }
            }
            await dequeue({ queueName });
        }
        binding.locked = false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        logger.log({ date: new Date(), context: queueName, text: `${scopeId}: message published on the '${queueName}' queue.` });
        const binding = bindings[queueName];
        binding.messages.push({ message, isOnceOff: false });
        await dequeue({ queueName });
    }});
    Object.defineProperty(this, 'queueGlobalMessage', { configurable: false, writable: false, value: async ({ message }) => {
        logger.log({ date: new Date(), context: defaultQueueName, text: `${scopeId}: message published on the '${defaultQueueName}' global queue.` });
        const binding = bindings[defaultQueueName];
        binding.messages.push({  message, isOnceOff: false });
        await dequeue({ queueName: defaultQueueName });
    }});
    Object.defineProperty(this, 'queueGlobalOnceOffMessage', { configurable: false, writable: false, value: async ({ message }) => {
        logger.log({ date: new Date(), context: defaultQueueName, text: `${scopeId}: message published on the '${defaultQueueName}' global queue.` });
        const binding = bindings[defaultQueueName];
        binding.messages.push({  message, isOnceOff: true });
        await dequeue({ queueName: defaultQueueName });
    }});
    Object.defineProperty(this, 'dequeueGlobalMessage', { configurable: false, writable: false, value: () => {
        return new Promise((resolve, reject) => {
            const binding = bindings[defaultQueueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: defaultQueueName, resolve, reject, resolved: false, priority, peek: false });
            dequeue({ queueName: defaultQueueName });
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, resolved: false, priority, peek: false });
            logger.log({ date: new Date(), context: queueName, text: `${scopeId}: subscribed to messages published on the '${queueName}' queue.` });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'peekMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, resolved: false, priority, peek: true });
            logger.log({ date: new Date(), context: queueName, text: `${scopeId}: subscribed to messages published on the '${queueName}' queue.` });
            dequeue({ queueName });
        });

    }});
    Object.defineProperty(this, 'clearQueueMessages', { configurable: false, writable: false, value: ({ queueName }) => {
        const binding = bindings[queueName];
        binding.messages = [];
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        if (!bindings[queueName]) {
            bindings[queueName] = { locked : false, callbacks: [], messages: [] };
        }
    }});
    this.bind({ queueName: defaultQueueName });
};

MessageQueue.prototype.queueMessage = function({ message, queueName }) { };
MessageQueue.prototype.queueGlobalMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
MessageQueue.prototype.dequeueGlobalMessage = function ({ queueName }) { };
MessageQueue.prototype.queueGlobalOnceOffMessage = function({ message }) { };
MessageQueue.prototype.clearQueueMessages = function ({ queueName }) { };
MessageQueue.prototype.bind = function ({ queueName }) { };
MessageQueue.prototype.peekMessage = function ({ queueName }) { };

module.exports = { MessageQueue };
