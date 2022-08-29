const factory = require('../factory.js');

const { Component } = require('C:\\component\\lib\\component.js');
/**
* IsSingleton: false 
* Create Component 
* @param {scopeId,packageJson}
*/
function createComponent({scopeId,packageJson}) {
    let container = factory.getContainer({ scopeId, type: Component, variableName:'component', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: Component, variableName:'component', singleton: false });
        container.config({scopeId,packageJson});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createComponent };
