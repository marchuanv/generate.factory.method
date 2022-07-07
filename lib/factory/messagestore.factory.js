
const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    
    const messageStore = new MessageStore({});
    return {messageStore};
}
module.exports = { createMessageStore };
