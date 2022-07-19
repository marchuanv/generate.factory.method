const utils = require('utils');

const allQueues = [];
function MessageQueue({ messageQueueReferences, messageQueueType, isSyncedMessageQueueTypes }) {
    this.Id = utils.generateGUID();
    this.isSyncedMessageQueueTypes = isSyncedMessageQueueTypes;
    this.messageQueueType = messageQueueType;
    const callbacks = [];
    const queue = [];
    messageQueueReferences.add(this);

    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: ({ message }) => {
        queue.push({ message });
        callbacks.forEach(callback => callback());
        const matchingMsgQueueRef = messageQueueReferences.filter({ 
            messageQueueId: this.Id,
            messageQueueTypeCode: messageQueueType.code,
            isSyncedMessageQueueTypes: this.isSyncedMessageQueueTypes
        });
        matchingMsgQueueRef.forEach(refQ => refQ.queueMessage({ message }));
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
};

MessageQueue.prototype.queueMessage = function({ message }) { };
MessageQueue.prototype.dequeueMessage = function () { };
module.exports = { MessageQueue };