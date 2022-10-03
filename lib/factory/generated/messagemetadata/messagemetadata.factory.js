const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagemetadata//messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageMetadata
* @param {metadata,token,factoryContainerBindingName}
*/
function createMessageMetadata({metadata,token,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {metadata,token} });
}
module.exports = { createMessageMetadata };
