const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartedmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStartedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStartedMessageQueueBinding, variableName:'httpServerStartedMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerStartedMessageQueueBinding, variableName:'httpServerStartedMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStartedMessageQueueBinding };
