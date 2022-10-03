const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageContentMetadata
* @param {data,factoryContainerBindingName}
*/
function createMessageContentMetadata({data,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
