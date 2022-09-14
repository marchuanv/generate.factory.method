const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { HttpServerResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.container.json');
const { HttpServerResponseMessageBus } = require('C:\\component\\lib\\http\\httpserverresponsemessagebus.prototype.js');

/**
* IsSingleton: HttpServerResponseMessageBusFactoryContainer.singleton
* Create HttpServerResponseMessageBus
* @param {scopeId}
*/
function createHttpServerResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpServerResponseMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerResponseMessageBusFactoryContainer);
}
module.exports = { createHttpServerResponseMessageBus };
