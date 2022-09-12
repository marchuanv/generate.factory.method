const { Factory } = require('../factory.js');
const factory = new Factory();
const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { Component } = require('C:\\component\\lib\\component.js');
/**
* IsSingleton: false 
* Create Component 
* @param {scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}
*/
function createComponent({scopeId,packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}) {
    let container = factory.getContainer({ scopeId, type: Component, variableName:'component', singleton: false });
    container.config({packageJson,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus});
    container.config(createUserSessions({scopeId}));
container.config(createServerMessageBus({scopeId,webSocketServerRequestMessageBus,webSocketServerResponseMessageBus}));
container.config(createClientMessageBus({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createComponent };
