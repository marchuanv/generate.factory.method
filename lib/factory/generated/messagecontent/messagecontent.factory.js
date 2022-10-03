const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagecontent//messagecontent.factory.container.json');
const factory = new Factory(container);

/**
* Create MessageContent
* @param {data,factoryContainerBindingName}
*/
function createMessageContent({data,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {data} });
}
module.exports = { createMessageContent };
