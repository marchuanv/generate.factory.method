const { factory } = require('../../factory.js');

/**
* Create ContentType
* @param {name,factoryContainerBindingName}
*/
function createContentType({name,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//contenttype//contenttype.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {name} });
}
module.exports = { createContentType };
