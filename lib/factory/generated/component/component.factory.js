const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//component//component.factory.container.json');
const factory = new Factory(container);

/**
* Create Component
* @param {packageJson,factoryContainerBindingName}
*/
function createComponent({packageJson,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {packageJson} });
}
module.exports = { createComponent };
