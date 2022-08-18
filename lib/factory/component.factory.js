const factory = require('./factory.js');

const { Component } = require('C:\\component\\lib\\component.js');
/**
* IsSingleton: false
* Create Component
* @param {packageJson}
*/
function createComponent({packageJson}) {
    const container = factory.createContainer({ type: Component, variableName:'component', singleton: false });
    container.config({packageJson});
    
    container.initialise();
    return container.references;
}
module.exports = { createComponent };
