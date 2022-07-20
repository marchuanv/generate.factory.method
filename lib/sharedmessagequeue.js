const utils = require('utils');
function SharedMessageQueue({ messageQueueTypes }) {
    this.Id = utils.generateGUID();
    let callbacks = {};
    const queues = {};
    for(const messageQueueType of messageQueueTypes.types) {
        callbacks[messageQueueType.name] = [];
        queues[messageQueueType.name] = [];
    }
    const dequeue = ({ callback }) => {
        const { Id, messageType, resolve } = callback;
        const { message } = queues[messageType].shift() || {};
        if (message && !utils.isEmptyObject(message)) {
            resolve({ message });
            const index = callbacks[messageType].indexOf(cb => cb.Id === Id);
            callbacks[messageType].splice(index, 1);
            return true;
        }
        return false;
    };
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message, messageType }) => {
        queues[messageType].push({ message });
        callbacks[messageType].forEach(callback => dequeue({ callback }));
    }});
    Object.defineProperty(this, 'dequeueMessage', { configurable: false, writable: false, value: ({ messageType }) => {
        return new Promise((resolve) => {
            const callback = { messageType, resolve, Id: utils.generateGUID() };
            callbacks.push(callback);
            dequeue({ callback });
        });
    }});
};
SharedMessageQueue.prototype.queueMessage = function({ message, messageType }) { };
SharedMessageQueue.prototype.dequeueMessage = function ({ messageType }) { };
module.exports = { SharedMessageQueue };
