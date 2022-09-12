const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
const { HttpServerMessageBusManager } = require('C:\\component\\lib\\http\\httpservermessagebusmanager.prototype.js');
const getHttpServerMessageBusManagerFactoryConfig = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBusManager 
* @param {scopeId,messageQueue}
*/
function createHttpServerMessageBusManager({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerMessageBusManager, variableName:'httpServerMessageBusManager', singleton: false });
    container.config(getHttpServerMessageBusManagerFactoryConfig());
    container.reference({messageQueue});
        container.reference(createHttpServerStopMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStartedMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStartMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerResponseMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerRequestMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStoppedMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBusManager };
