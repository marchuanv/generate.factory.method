const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStore } = require('C:\\component\\lib\\messagestore.prototype.js');
const getMessageStoreFactoryConfig = require('C:\\component\\lib\\factory\\messagestore.factory.config.js');
/**
* IsSingleton: false 
* Create MessageStore 
* @param {scopeId}
*/
function createMessageStore({scopeId}) {
    const container = factory.getContainer({ scopeId, type: MessageStore, variableName:'messageStore', singleton: false });
    container.config(getMessageStoreFactoryConfig());
    container.reference({});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStore };
