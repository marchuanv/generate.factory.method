const factory = require('./factory.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    let container = factory.createContainer(MessageStore);
    container.add({});
    
    const messageStore = new MessageStore(container);
    container.add({messageStore});
    return container;
}
module.exports = { createMessageStore };
