const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerRequestsMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestsmessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerRequestsMessageBus 
* @param {scopeId}
*/
function createHttpServerRequestsMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerRequestsMessageBus, variableName:'httpServerRequestsMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerRequestsMessageBus, variableName:'httpServerRequestsMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestsMessageBus };
