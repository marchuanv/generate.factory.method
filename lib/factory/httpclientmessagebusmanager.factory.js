const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientMessageBusManager } = require('C:\\component\\lib\\http\\httpclientmessagebusmanager.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBusManager 
* @param {scopeId}
*/
function createHttpClientMessageBusManager({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientMessageBusManager, variableName:'httpClientMessageBusManager', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientMessageBusManager, variableName:'httpClientMessageBusManager', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBusManager };
