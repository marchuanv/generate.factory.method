const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
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
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
