const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.prototype.js');
const getHttpServerMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId,timeout,messageQueue,senderAddress}
*/
function createHttpServerMessageBus({scopeId,timeout,messageQueue,senderAddress}) {
    const container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config(getHttpServerMessageBusFactoryConfig());
    container.reference({timeout,messageQueue,senderAddress});
        container.reference(createLogger({scopeId}));
container.reference(createHttpServerStoppedMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStopMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStartedMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerStartMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerResponseMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpServerRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
