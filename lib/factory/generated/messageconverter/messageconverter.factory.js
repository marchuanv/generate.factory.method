const { factory } = require('../../factory.js');

/**
* Create MessageConverter
* @param {factoryContainerBindingName}
*/
function createMessageConverter({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createMessageConverter };
