const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messageconverter.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageConverterFactoryContainer.singleton
* Create MessageConverter
* @param {factoryContainerBindingName}
*/
function createMessageConverter({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageConverter };
