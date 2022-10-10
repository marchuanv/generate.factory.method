const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//logger//logger.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create Logger
* @param {factoryContainerBindingName}
*/
function createLogger({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createLogger };
