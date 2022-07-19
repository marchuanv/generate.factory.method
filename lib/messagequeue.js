const utils = require('utils');

function MessageQueue() {
    
    this.Id = utils.generateGUID();
    const referencedQueues = [];
    const callbacks = [];
    const queue = [];
    
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message }) => {
        queue.push({ message });
        callbacks.forEach(callback => callback());
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: () => {
        return new Promise((resolve) => {
            callbacks.push(() => {
                const { message } = queue.shift() || {};
                if (message && !utils.isEmptyObject(message)) {
                    resolve({ message });
                }
            })
        });
    }});
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ messageQueue }) => {
        if (messageQueue && !referencedQueues.find(q => q.Id === messageQueue.Id)) {
            messageQueue.sync({ messageQueue: this });
        }
    }});
    Object.defineProperty(this, 'cloneMessages', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(httpRequestMessages));
    }});
};

MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
MessageQueue.prototype.sync = function ({ messageQueue }) { };
MessageQueue.prototype.cloneMessages = function () { };
module.exports = { MessageQueue };