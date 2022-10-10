const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagestore//messagestore.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create MessageStore
* @param {factoryContainerBindingName}
*/
function createMessageStore({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageStore };
