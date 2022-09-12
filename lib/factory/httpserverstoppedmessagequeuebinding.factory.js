const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstoppedmessagequeuebinding.prototype.js');
const getHttpServerStoppedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStoppedMessageQueueBinding, variableName:'httpServerStoppedMessageQueueBinding', singleton: true });
    container.config(getHttpServerStoppedMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
