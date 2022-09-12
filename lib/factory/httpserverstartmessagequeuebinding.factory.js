const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartmessagequeuebinding.prototype.js');
const getHttpServerStartMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStartMessageQueueBinding, variableName:'httpServerStartMessageQueueBinding', singleton: true });
    container.config(getHttpServerStartMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartMessageQueueBinding };
