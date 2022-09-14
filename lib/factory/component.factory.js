const { Factory } = require('../factory.js');
const { ComponentFactoryContainer } = require('C:\\component\\lib\\factory\\component.factory.container.json');
const { Component } = require('C:\\component\\lib\\component.prototype.js');
const { createComponent } = require('C:\\component\\lib\\factory\\component.factory.js');

const factory = new Factory(ComponentFactoryContainer);

/**
* IsSingleton: ComponentFactoryContainer.singleton
* Create Component
* @param {scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}
*/
function createComponent({scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus}) {
    const args = {scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus};
    const binding = ComponentFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createComponent };
