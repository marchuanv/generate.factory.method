const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\contenttype\\contenttype.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {name}
*/
function createContentType({name,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {name} });
}
module.exports = { createContentType };
