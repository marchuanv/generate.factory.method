const factory = require('./factory.js');

const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    const container = factory.createContainer({ type: Component, variableName:'component' });
    container.config({packageJson});
    
    container.complete();
    return container.references;
}
module.exports = { createComponent };
