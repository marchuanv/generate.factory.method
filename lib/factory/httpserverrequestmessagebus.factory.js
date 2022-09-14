const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { HttpServerRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.container.json');
const { HttpServerRequestMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestmessagebus.prototype.js');

/**
* IsSingleton: HttpServerRequestMessageBusFactoryContainer.singleton
* Create HttpServerRequestMessageBus
* @param {scopeId}
*/
function createHttpServerRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpServerRequestMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerRequestMessageBusFactoryContainer);
}
module.exports = { createHttpServerRequestMessageBus };
