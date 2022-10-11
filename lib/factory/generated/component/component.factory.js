const { factory } = require('../../factory.js');

/**
* Create Component
* @param {packageJson,factoryContainerBindingName}
*/
function createComponent({packageJson,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//component//component.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {packageJson} });
}
module.exports = { createComponent };
