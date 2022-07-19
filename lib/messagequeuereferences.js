function MessageQueueReferences() {
    const references = [];
    Object.defineProperty(this, 'add', { configurable: false, writable: false, value: (messageQueue) => {
        if (!references.find(ref => ref.Id === messageQueue.Id)) {
            references.push(messageQueue);
        }
    }});
    Object.defineProperty(this, 'filter', { configurable: false, writable: false, value: ({ messageQueueId, messageQueueTypeCode, isSyncedMessageQueueTypes }) => {
        return references.filter(ref => 
            ref.Id !== messageQueueId &&
            ref.messageQueueType.code === messageQueueTypeCode &&
            ref.isSyncedMessageQueueTypes === isSyncedMessageQueueTypes
        );
    }});
};
MessageQueueReferences.prototype.add = function({ messageQueue }) { };
MessageQueueReferences.prototype.filter = function({ messageQueueId, messageQueueTypeCode, isSyncedMessageQueueTypes }) { };
module.exports = { MessageQueueReferences };