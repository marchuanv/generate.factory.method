const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\logger\\logger.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: LoggerFactoryContainer.singleton
* Create Logger
* @param {}
*/
function createLogger({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createLogger };
