const factory = require('../factory.js');
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    let container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
        container.config({timeout});
            container.config(createHttpClientStoppedMessageQueueBinding({scopeId}));
container.config(createHttpClientStopMessageQueueBinding({scopeId}));
container.config(createHttpClientStartedMessageQueueBinding({scopeId}));
container.config(createHttpClientStartMessageQueueBinding({scopeId}));
container.config(createHttpClientResponseMessageQueueBinding({scopeId}));
container.config(createHttpClientRequestMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
