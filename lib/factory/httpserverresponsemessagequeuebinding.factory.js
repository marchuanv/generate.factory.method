const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverresponsemessagequeuebinding.prototype.js');
const getHttpServerResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerResponseMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpServerResponseMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerResponseMessageQueueBinding, variableName:'httpServerResponseMessageQueueBinding', singleton: false });
    container.config(getHttpServerResponseMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerResponseMessageQueueBinding };
