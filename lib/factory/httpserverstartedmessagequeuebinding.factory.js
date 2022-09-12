const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartedmessagequeuebinding.prototype.js');
const getHttpServerStartedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartedMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStartedMessageQueueBinding, variableName:'httpServerStartedMessageQueueBinding', singleton: true });
    container.config(getHttpServerStartedMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartedMessageQueueBinding };
