const { factory } = require('../../factory.js');

/**
* Create Logger
* @param {factoryContainerBindingName}
*/
function createLogger({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//logger//logger.factory.container.default.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createLogger };
