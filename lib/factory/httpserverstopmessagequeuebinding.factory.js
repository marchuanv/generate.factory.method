const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerStopMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerStopMessageQueueBinding, variableName:'httpServerStopMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerStopMessageQueueBinding };
