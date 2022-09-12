const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
/**
* IsSingleton: false 
* Create MessageStatus 
* @param {scopeId,messageStatusCode}
*/
function createMessageStatus({scopeId,messageStatusCode}) {
    let container = factory.getContainer({ scopeId, type: MessageStatus, variableName:'messageStatus', singleton: false });
    container.config({messageStatusCode});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStatus };
