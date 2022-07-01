const { MessageStore } = require('C:\\component\\lib\\messagestore.js'); 
function MessageStoreFactory({  }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageStore({  });
    }});
} 
module.exports = { MessageStoreFactory }; 
