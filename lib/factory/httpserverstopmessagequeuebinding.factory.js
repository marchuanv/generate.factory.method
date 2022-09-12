const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.prototype.js');
const getHttpServerStopMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.config.js');
/**
* IsSingleton: true 
* Create HttpServerStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStopMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: true });
    container.config(getHttpServerStopMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStopMessageQueueBinding };
