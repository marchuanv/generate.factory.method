const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerResponseMessageBus } = require('C:\\component\\lib\\http\\httpserverresponsemessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerResponseMessageBus 
* @param {scopeId}
*/
function createHttpServerResponseMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerResponseMessageBus, variableName:'httpServerResponseMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerResponseMessageBus, variableName:'httpServerResponseMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerResponseMessageBus };
