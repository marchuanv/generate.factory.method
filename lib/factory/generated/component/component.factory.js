const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//component//component.factory.container.json');
const factory = new Factory(container);

/**
* Create Component
* @param {packageJson,clientMessageBus,serverMessageBus,userSessions,factoryContainerBindingName}
*/
function createComponent({packageJson,clientMessageBus,serverMessageBus,userSessions,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {packageJson,clientMessageBus,serverMessageBus,userSessions} });
}
module.exports = { createComponent };
