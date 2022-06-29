function MessageStore() {
    Object.defineProperty(this, 'save', { writable: false, value: async ({ message }) => {
    }});
}
MessageStore.prototype.save = async function({ message }) { };
MessageStore.prototype.get = async function({ messageId }) { };
module.exports = { MessageStore };