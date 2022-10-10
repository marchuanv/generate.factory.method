const { Factory } = require('../../factory.js');

/**
* Create ContentType
* @param {name,factoryContainerBindingName}
*/
function createContentType({name,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//contenttype//contenttype.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {name} });
}
module.exports = { createContentType };
