const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\contenttype.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ContentTypeFactoryContainer.singleton
* Create ContentType
* @param {name}
*/
function createContentType({name}) {
    const ctorArgs = {name};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createContentType };
