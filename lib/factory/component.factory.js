const { Factory } = require('../factory.js');
const factory = new Factory();
const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
const { ComponentFactoryContainer } = require('C:\\component\\lib\\factory\\component.container.json');
const { Component } = require('C:\\component\\lib\\component.prototype.js');

/**
* IsSingleton: ComponentFactoryContainer.singleton
* Create Component
* @param {scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus}
*/
function createComponent({scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus}) {
    const args = {scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus};
    const { scopeId } = args;
    const binding = ComponentFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, ComponentFactoryContainer);
}
module.exports = { createComponent };
