const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.prototype.js');
const getMessageStatusFactoryConfig = require('C:\\component\\lib\\factory\\messagestatus.factory.config.js');
/**
* IsSingleton: false 
* Create MessageStatus 
* @param {scopeId,messageStatusCode}
*/
function createMessageStatus({scopeId,messageStatusCode}) {
    const container = factory.getContainer({ scopeId, type: MessageStatus, variableName:'messageStatus', singleton: false });
    container.config(getMessageStatusFactoryConfig());
    container.reference({messageStatusCode});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageStatus };
