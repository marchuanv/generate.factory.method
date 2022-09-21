const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messageconverter.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageConverterFactoryContainer.singleton
* Create MessageConverter
* @param {}
*/
function createMessageConverter({}) {
    const ctorArgs = {};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageConverter };
