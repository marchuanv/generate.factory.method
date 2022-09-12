const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartmessagequeuebinding.prototype.js');
const getHttpServerStartMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStartMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpServerStartMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStartMessageQueueBinding, variableName:'httpServerStartMessageQueueBinding', singleton: true });
    container.config(getHttpServerStartMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartMessageQueueBinding };
