const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpServerStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStopMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: true });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: true });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStopMessageQueueBinding };
