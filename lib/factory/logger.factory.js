const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\logger.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: LoggerFactoryContainer.singleton
* Create Logger
* @param {factoryContainerBindingName}
*/
function createLogger({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createLogger };
