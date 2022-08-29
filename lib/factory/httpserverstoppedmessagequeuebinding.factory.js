const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstoppedmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStoppedMessageQueueBinding, variableName:'httpServerStoppedMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerStoppedMessageQueueBinding, variableName:'httpServerStoppedMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
