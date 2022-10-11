const { factory } = require('../../factory.js');

/**
* Create MessageContentMetadata
* @param {data,factoryContainerBindingName}
*/
function createMessageContentMetadata({data,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
