function MessageStore() {
    Object.defineProperty(this, 'save', { configurable: false, writable: false, value: async ({ message }) => {
    }});
    Object.defineProperty(this, 'get', { configurable: false, writable: false, value: async ({ messageId }) => {
    }});
}
MessageStore.prototype.save = async function({ message }) { };
MessageStore.prototype.get = async function({ messageId }) { };
module.exports = { MessageStore };