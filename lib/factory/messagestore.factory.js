const factory = require('./factory.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
/**
* IsSingleton: false 
* Create MessageStore 
* @param {}
*/
function createMessageStore({ scopeId,  }) {
    const container = factory.createContainer({ scopeId, type: MessageStore, variableName:'messageStore', singleton: false });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createMessageStore };
