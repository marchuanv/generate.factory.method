const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerMessageBusManager } = require('C:\\component\\lib\\http\\httpservermessagebusmanager.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBusManager 
* @param {scopeId}
*/
function createHttpServerMessageBusManager({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerMessageBusManager, variableName:'httpServerMessageBusManager', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerMessageBusManager, variableName:'httpServerMessageBusManager', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBusManager };
