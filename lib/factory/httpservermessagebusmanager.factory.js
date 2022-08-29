const factory = require('../factory.js');
const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
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
        container.config({});
            container.config(createHttpServerStopMessageQueueBinding({scopeId}));
container.config(createHttpServerStartedMessageQueueBinding({scopeId}));
container.config(createHttpServerStartMessageQueueBinding({scopeId}));
container.config(createHttpServerResponseMessageQueueBinding({scopeId}));
container.config(createHttpServerRequestMessageQueueBinding({scopeId}));
container.config(createHttpServerStoppedMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBusManager };
