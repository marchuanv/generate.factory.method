const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStore } = require('C:\\component\\lib\\messagestore.js');
/**
* IsSingleton: false 
* Create MessageStore 
* @param {scopeId}
*/
function createMessageStore({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageStore, variableName:'messageStore', singleton: false });
    container.config({});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStore };
