const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
const { HttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverrequestmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageQueueBinding 
* @param {scopeId}
*/
function createHttpServerRequestMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerRequestMessageQueueBinding, variableName:'httpServerRequestMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerRequestMessageQueueBinding, variableName:'httpServerRequestMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageQueueBinding };
