const { Factory } = require('../../factory.js');

/**
* Create MessageContentMetadata
* @param {data,factoryContainerBindingName}
*/
function createMessageContentMetadata({data,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
