const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//contenttype//contenttype.factory.container.json');
const factory = new Factory(container);

/**
* Create ContentType
* @param {name,factoryContainerBindingName}
*/
function createContentType({name,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {name} });
}
module.exports = { createContentType };
