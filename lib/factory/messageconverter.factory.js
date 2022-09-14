const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageConverterFactoryContainer } = require('C:\\component\\lib\\factory\\messageconverter.container.json');
const { MessageConverter } = require('C:\\component\\lib\\messageconverter.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageConverterFactoryContainer);
}
module.exports = { createMessageConverter };
