const { FactoryContainer } = require('./factory.container.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    let container = new FactoryContainer();
    container.add({});
    
    const messageStore = new MessageStore(container);
    container.add({messageStore});
    return container;
}
module.exports = { createMessageStore };
