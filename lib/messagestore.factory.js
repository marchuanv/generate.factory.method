const { MessageStore } = require('C:\\component\\lib\\messagestore.js'); 
function MessageStoreFactory({  }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageStore({  });
    }});
} 
module.exports = { MessageStoreFactory }; 
