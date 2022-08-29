const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
const { HttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverresponsemessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerResponseMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerResponseMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerResponseMessageQueueBinding, variableName:'httpServerResponseMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerResponseMessageQueueBinding, variableName:'httpServerResponseMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerResponseMessageQueueBinding };
