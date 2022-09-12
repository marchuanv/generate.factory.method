const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.prototype.js');
const getHttpServerStopMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStopMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createHttpServerStopMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: true });
    container.config(getHttpServerStopMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStopMessageQueueBinding };
