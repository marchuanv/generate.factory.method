const { FactoryContainer } = require('./factory.container.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    let factoryContainer = new FactoryContainer();
    
    const messageStore = new MessageStore({});
    factoryContainer.add(messageStore);
    return factoryContainer;
}
module.exports = { createMessageStore };
