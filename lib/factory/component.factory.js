const factory = require('./factory.js');

const { Component } = require('D:\\component\\lib\\component.js');
/**
* Create Component
* @param {packageJson}
*/
function createComponent({packageJson}) {
    const container = factory.createContainer({ type: Component, variableName:'component', singleton: false });
    container.config({packageJson});
    
    container.complete();
    return container.references;
}
module.exports = { createComponent };
