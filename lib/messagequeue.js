const utils = require('utils');
function SharedMessageQueue() {
    this.Id = utils.generateGUID();
    let callbacks = [];
    const queue = [];
    const dequeue = (messageType, resolve) => {
        const msgType = messageType;
        {
            const { message, messageType } = queue.shift() || {};
            if (messageType && msgType && msgType !==  messageType) {
                if (dequeue(messageType, resolve)) {
                    return true;
                }
                queue.push({ message, messageType });
            }
            if (message && !utils.isEmptyObject(message)) {
                resolve({ message });
                return true;
            }
            return false;
        }
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageType }) => {
        console.log(`Queue(${this.Id}): Message Queued`);
        queue.push({ message, messageType });
        callbacks = callbacks.filter(c => c.resolved === false);
        callbacks.forEach(callback => {
            if (callback.resolve()) {
                callback.resolved = true;
            }
        });
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageType }) => {
        return new Promise((resolve) => {
            callbacks.push({ resolved: false, resolve: () => dequeue(messageType, resolve) });
            dequeue(messageType, resolve);
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageType }) { };
module.exports = { SharedMessageQueue };