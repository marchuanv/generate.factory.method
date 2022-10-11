const { factory } = require('../../factory.js');

/**
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//httpclientstoppedmessagequeuebinding//httpclientstoppedmessagequeuebinding.factory.container.default.binding.json"
};
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
