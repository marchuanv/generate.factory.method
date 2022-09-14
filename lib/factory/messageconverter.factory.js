const { Factory } = require('../factory.js');
const { MessageConverterFactoryContainer } = require('C:\\component\\lib\\factory\\messageconverter.factory.container.json');
const factory = new Factory(MessageConverterFactoryContainer);

/**
* IsSingleton: MessageConverterFactoryContainer.singleton
* Create MessageConverter
* @param {scopeId}
*/
function createMessageConverter({scopeId}) {
    const args = {scopeId};
    const binding = MessageConverterFactoryContainer.bindings[scopeId];
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
module.exports = { createMessageConverter };
