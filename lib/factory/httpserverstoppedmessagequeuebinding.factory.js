const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstoppedmessagequeuebinding.prototype.js');
const getHttpServerStoppedMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStoppedMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStoppedMessageQueueBinding, variableName:'httpServerStoppedMessageQueueBinding', singleton: true });
    container.config(getHttpServerStoppedMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
