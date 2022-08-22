const factory = require('./factory.js');

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
/**
* IsSingleton: false 
* Create MessageStore 
* @param {scopeId}
*/
function createMessageStore({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageStore, variableName:'messageStore', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageStore, variableName:'messageStore', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStore };
