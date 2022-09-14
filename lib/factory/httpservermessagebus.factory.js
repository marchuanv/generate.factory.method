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
const { HttpServerMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpservermessagebus.container.json');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.prototype.js');

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    const args = {scopeId,timeout,senderHost,senderPort};
    const { scopeId } = args;
    const binding = HttpServerMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerMessageBusFactoryContainer);
}
module.exports = { createHttpServerMessageBus };
