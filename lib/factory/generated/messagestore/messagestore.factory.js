const { factory } = require('../../factory.js');

/**
* Create MessageStore
* @param {factoryContainerBindingName}
*/
function createMessageStore({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//messagestore//messagestore.factory.container.default.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createMessageStore };
