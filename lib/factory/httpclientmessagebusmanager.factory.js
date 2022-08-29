const factory = require('../factory.js');
const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
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
            container.config(createHttpClientStopMessageQueueBinding({scopeId}));
container.config(createHttpClientStartedMessageQueueBinding({scopeId}));
container.config(createHttpClientStartMessageQueueBinding({scopeId}));
container.config(createHttpClientResponseMessageQueueBinding({scopeId}));
container.config(createHttpClientRequestMessageQueueBinding({scopeId}));
container.config(createHttpClientStoppedMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBusManager };
