const { Factory } = require('../factory.js');
const factory = new Factory();
const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
const { Component } = require('C:\\component\\lib\\component.prototype.js');
const getComponentFactoryConfig = require('C:\\component\\lib\\factory\\component.factory.config.js');
/**
* IsSingleton: false 
* Create Component 
* @param {scopeId,packageJson,messageConverter,messageQueue,httpClientResponseMessageBus,serverMessageBus,userSessions}
*/
function createComponent({scopeId,packageJson,messageConverter,messageQueue,httpClientResponseMessageBus,serverMessageBus,userSessions}) {
    const container = factory.getContainer({ scopeId, type: Component, variableName:'component', singleton: false });
    container.config(getComponentFactoryConfig());
    container.reference({packageJson,messageConverter,messageQueue,httpClientResponseMessageBus,serverMessageBus,userSessions});
        container.reference(createClientMessageBus({scopeId,messageConverter,messageQueue,httpClientResponseMessageBus}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createComponent };
