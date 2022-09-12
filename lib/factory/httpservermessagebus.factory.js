const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.prototype.js');
const getHttpServerMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config(getHttpServerMessageBusFactoryConfig());
    container.reference({timeout,senderHost,senderPort});
        container.reference(createLogger({scopeId}));
container.reference(createSenderAddress({scopeId,senderHost,senderPort}));
container.reference(createHttpServerStoppedMessageQueueBinding({scopeId}));
container.reference(createHttpServerStopMessageQueueBinding({scopeId}));
container.reference(createHttpServerStartedMessageQueueBinding({scopeId}));
container.reference(createHttpServerStartMessageQueueBinding({scopeId}));
container.reference(createHttpServerResponseMessageQueueBinding({scopeId}));
container.reference(createHttpServerRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
