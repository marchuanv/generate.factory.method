const utils = require('utils');
function SharedMessageQueue({ sharedLogger }) {
    const bindings = {};
    const onceOffMsgHistory = [];
    const globalQueueName = 'cbfb10b3-80db-4279-a01b-875118f65cb5';
    const dequeue = async ({ queueName }) => {
        const binding = bindings[queueName];
        if (binding.messages.length === 0 || binding.callbacks.length === 0) {
            return;
        }
        if (binding.locked) {
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
                    return;
                }
                onceOffMsgHistory.push(base64String)
            }
            sharedLogger.log({ date: new Date(), text: `notifying ${callback.Id} subscribers of message pulled from the ${queueName} queue.` });
            await callback.resolve({ message });
            callback.resolved = true;
        }
        binding.callbacks = binding.callbacks.filter(cb => cb.resolved === false);
        binding.locked = false;
        await dequeue({ queueName });
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
        const binding = bindings[queueName];
        binding.messages.push({ message, isOnceOff: false });
        await dequeue({ queueName });
    }});
    Object.defineProperty(this, 'queueGlobalMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const binding = bindings[globalQueueName];
        binding.messages.push({  message, isOnceOff: false });
        await dequeue({ queueName: globalQueueName });
    }});
    Object.defineProperty(this, 'queueGlobalOnceOffMessage', { configurable: false, writable: false, value: async ({ message }) => {
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

SharedMessageQueue.prototype.queueMessage = function({ message, queueName }) { };
SharedMessageQueue.prototype.queueGlobalMessage = function({ message }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ queueName }) { };
SharedMessageQueue.prototype.dequeueGlobalMessage = function ({ queueName }) { };
SharedMessageQueue.prototype.queueGlobalOnceOffMessage = function({ message }) { };
SharedMessageQueue.prototype.bind = function ({ queueName }) { };
SharedMessageQueue.prototype.unbind = function ({ queueName }) { };
SharedMessageQueue.prototype.isBinded = function ({ queueName }) { };
module.exports = { SharedMessageQueue };
