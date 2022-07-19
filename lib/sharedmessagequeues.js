const references = [];
function SharedMessageQueues() {
    Object.defineProperty(this, 'add', { configurable: false, writable: false, value: (messageQueue) => {
        if (!references.find(ref => ref.Id === messageQueue.Id)) {
            references.push(messageQueue);
        }
    }});
    Object.defineProperty(this, 'references', { configurable: false, writable: false, value: ({ messageQueueId, messageQueueTypeCode, isSyncedMessageQueueTypes }) => {
        return references.filter(ref => 
            ref.Id !== messageQueueId &&
            ref.messageQueueType.code === messageQueueTypeCode &&
            ref.isSyncedMessageQueueTypes === isSyncedMessageQueueTypes
        );
    }});
};
SharedMessageQueues.prototype.add = function({ messageQueue }) { };
SharedMessageQueues.prototype.references = function() { };
module.exports = { SharedMessageQueues };