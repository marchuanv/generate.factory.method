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
* @param {scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}
*/
function createComponent({scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}) {
    const container = factory.getContainer({ scopeId, type: Component, variableName:'component', singleton: false });
    container.config(getComponentFactoryConfig());
    container.reference({packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus});
        container.reference(createUserSessions({scopeId}));
container.reference(createServerMessageBus({scopeId,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}));
container.reference(createClientMessageBus({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createComponent };
