
const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    
    const messageStore = new MessageStore({});
    console.log('MessageStoreFactory: --> created MessageStore');
    return {messageStore};
}
module.exports = { createMessageStore };
