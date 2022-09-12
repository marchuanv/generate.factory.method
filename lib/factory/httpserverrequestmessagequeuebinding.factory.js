const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverrequestmessagequeuebinding.prototype.js');
const getHttpServerRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpServerRequestMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerRequestMessageQueueBinding, variableName:'httpServerRequestMessageQueueBinding', singleton: false });
    container.config(getHttpServerRequestMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageQueueBinding };
