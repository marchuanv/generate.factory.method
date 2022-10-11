const { factory } = require('../../factory.js');

/**
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httpservermessagebusmanager//httpservermessagebusmanager.factory.container.default.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerMessageBusManager };
