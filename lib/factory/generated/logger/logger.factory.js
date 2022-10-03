const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//logger//logger.factory.container.json');
const factory = new Factory(container);

/**
* Create Logger
* @param {factoryContainerBindingName}
*/
function createLogger({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createLogger };
