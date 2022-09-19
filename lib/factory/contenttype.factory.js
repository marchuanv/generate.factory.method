const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\contenttype.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {factoryContainerBindingName,name}
*/
function createContentType({factoryContainerBindingName,name}) {
    const ctorArgs = {factoryContainerBindingName,name};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createContentType };
