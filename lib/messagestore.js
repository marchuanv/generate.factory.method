const { MessageStore } = require("./messagestore.prototype");
MessageStore.prototype.constructor = function() {
    Object.defineProperty(this, 'save', { configurable: false, writable: false, value: async ({ message }) => {
    }});
    Object.defineProperty(this, 'get', { configurable: false, writable: false, value: async ({ messageId }) => {
    }});
}
