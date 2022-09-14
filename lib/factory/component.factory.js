const { Factory } = require('../factory.js');
const factory = new Factory();
const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { Component } = require('C:\\component\\lib\\component.prototype.js');
const getComponentFactoryConfig = require('C:\\component\\lib\\factory\\component.factory.config.js');
/**
* IsSingleton: false 
* Create Component 
* @param {scopeId,packageJson}
*/
function createComponent({scopeId,packageJson}) {
    const container = factory.getContainer({ scopeId, type: Component, variableName:'component', singleton: false });
    container.config(getComponentFactoryConfig());
    container.reference({packageJson});
        container.reference(createUserSessions({scopeId}));
container.reference(createServerMessageBus({scopeId}));
container.reference(createClientMessageBus({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createComponent };
