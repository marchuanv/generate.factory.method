function MessageStore() {
    this.constructor();
};
MessageStore.prototype.save = async function({ message }) { };
MessageStore.prototype.get = async function({ messageId }) { };
module.exports = { MessageStore };