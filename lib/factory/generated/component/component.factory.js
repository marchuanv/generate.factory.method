const { Factory } = require('../../factory.js');

/**
* Create Component
* @param {packageJson,factoryContainerBindingName}
*/
function createComponent({packageJson,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//component//component.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {packageJson} });
}
module.exports = { createComponent };
