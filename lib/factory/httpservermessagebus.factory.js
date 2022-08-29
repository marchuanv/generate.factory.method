const factory = require('../factory.js');
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { createHttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.js');
const { createHttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
const { createHttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
        container.config({scopeId,timeout,senderHost,senderPort});
            container.config(createLogger({scopeId}));
container.config(createSenderAddress({scopeId,senderHost,senderPort}));
container.config(createHttpServerStoppedMessageQueueBinding({scopeId}));
container.config(createHttpServerStopMessageQueueBinding({scopeId}));
container.config(createHttpServerStartedMessageQueueBinding({scopeId}));
container.config(createHttpServerStartMessageQueueBinding({scopeId}));
container.config(createHttpServerResponseMessageQueueBinding({scopeId}));
container.config(createHttpServerRequestMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
