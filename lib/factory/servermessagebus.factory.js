const { Factory } = require('../factory.js');
const { ServerMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\servermessagebus.factory.container.json');
const factory = new Factory(ServerMessageBusFactoryContainer);

/**
* IsSingleton: ServerMessageBusFactoryContainer.singleton
* Create ServerMessageBus
* @param {scopeId,serverResponseMessageBus,serverRequestMessageBus}
*/
function createServerMessageBus({scopeId,serverResponseMessageBus,serverRequestMessageBus}) {
    const args = {scopeId,serverResponseMessageBus,serverRequestMessageBus};
    const binding = ServerMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createServerMessageBus };
