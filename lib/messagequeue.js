const utils = require('utils');
function MessageQueue({ logger }) {
    const bindings = {};
    const onceOffMsgHistory = [];
    const globalQueueName = 'cbfb10b3-80db-4279-a01b-875118f65cb5';
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.messages.length === 0 || binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
            logger.log({ date: new Date(), context: queueName, text: `'${queueName}' is waiting for queue lock.` });
            setTimeout(() => dequeue({ queueName }), 1000);
            return;
        } 
        binding.locked = true;
        const sortedCallbacks = binding.callbacks.sort((x, y) => x.priority - y.priority);
       
        let callback = sortedCallbacks.shift();
        if (callback && !callback.resolved) {
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
            logger.log({ date: new Date(), context: queueName, text: `message pulled from the '${queueName}' queue.` });
            callback.resolved = true;
        }
        binding.callbacks = binding.callbacks.filter(cb => cb.resolved === false);
        binding.locked = false;
        await dequeue({ queueName });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        logger.log({ date: new Date(), context: queueName, text: `message published on the '${queueName}' queue.` });
        const binding = bindings[queueName];
        binding.messages.push({ message, isOnceOff: false });
        await dequeue({ queueName });
    }});
    Object.defineProperty(this, 'queueGlobalMessage', { configurable: false, writable: false, value: async ({ message }) => {
        logger.log({ date: new Date(), context: globalQueueName, text: `message published on the '${globalQueueName}' global queue.` });
        const binding = bindings[globalQueueName];
        binding.messages.push({  message, isOnceOff: false });
        await dequeue({ queueName: globalQueueName });
    }});
    Object.defineProperty(this, 'queueGlobalOnceOffMessage', { configurable: false, writable: false, value: async ({ message }) => {
        logger.log({ date: new Date(), context: globalQueueName, text: `message published on the '${globalQueueName}' global queue.` });
        const binding = bindings[globalQueueName];
        binding.messages.push({  message, isOnceOff: true });
        await dequeue({ queueName: globalQueueName });
    }});
    Object.defineProperty(this, 'dequeueGlobalMessage', { configurable: false, writable: false, value: () => {
        return new Promise((resolve, reject) => {
            const binding = bindings[globalQueueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: globalQueueName, resolve, reject, resolved: false, priority });
            dequeue({ queueName: globalQueueName });
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ queueName }) => {
        return new Promise((resolve, reject) => {
            const binding = bindings[queueName];
            const priority = binding.callbacks.length + 1;
            binding.callbacks.push({ Id: queueName, resolve, reject, resolved: false, priority });
            dequeue({ queueName });
        });
    }});
    Object.defineProperty(this, 'clearQueueMessages', { configurable: false, writable: false, value: ({ queueName }) => {
        const binding = bindings[queueName];
        binding.messages = [];
    }});
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        bindings[queueName] = { locked : false, callbacks: [], messages: [] };
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ queueName }) => {
        delete bindings[queueName];
    }});
    Object.defineProperty(this, 'isBinded', { configurable: false, writable: false, value: ({ queueName }) => {
        const binding = bindings[queueName];
        return binding !== undefined && binding !== null;
    }});
    this.bind({ queueName: globalQueueName });
};

MessageQueue.prototype.queueMessage = function({ message, queueName }) { };
MessageQueue.prototype.queueGlobalMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
MessageQueue.prototype.dequeueGlobalMessage = function ({ queueName }) { };
MessageQueue.prototype.queueGlobalOnceOffMessage = function({ message }) { };
MessageQueue.prototype.clearQueueMessages = function ({ queueName }) { };
MessageQueue.prototype.bind = function ({ queueName }) { };
MessageQueue.prototype.unbind = function ({ queueName }) { };
MessageQueue.prototype.isBinded = function ({ queueName }) { };

module.exports = { MessageQueue };
