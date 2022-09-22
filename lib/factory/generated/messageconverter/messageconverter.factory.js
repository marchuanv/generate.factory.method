const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\messageconverter\\messageconverter.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageConverterFactoryContainer.singleton
* Create MessageConverter
* @param {}
*/
function createMessageConverter({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageConverter };
