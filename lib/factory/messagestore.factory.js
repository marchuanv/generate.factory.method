const factory = require('./factory.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
/**
* IsSingleton: false 
* Create MessageStore 
* @param {}
*/
function createMessageStore({}) {
    const container = factory.createContainer({ type: MessageStore, variableName:'messageStore', singleton: false });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createMessageStore };
