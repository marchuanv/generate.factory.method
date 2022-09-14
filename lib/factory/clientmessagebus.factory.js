const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { ClientMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\clientmessagebus.container.json');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.prototype.js');

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {scopeId,clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({scopeId,clientRequestMessageBus,clientResponseMessageBus}) {
    const args = {scopeId,clientRequestMessageBus,clientResponseMessageBus};
    const binding = ClientMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, ClientMessageBusFactoryContainer);
}
module.exports = { createClientMessageBus };
