const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStartMessageQueueBinding, variableName:'httpServerStartMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerStartMessageQueueBinding, variableName:'httpServerStartMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartMessageQueueBinding };
