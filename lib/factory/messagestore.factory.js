const factory = require('./factory.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
function createMessageStore({}) {
    const container = factory.createContainer({ type: MessageStore, variableName:'messageStore' });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageStore };
