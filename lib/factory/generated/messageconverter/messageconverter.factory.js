const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//messageconverter//messageconverter.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageConverter
* @param {factoryContainerBindingName}
*/
function createMessageConverter({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageConverter };
