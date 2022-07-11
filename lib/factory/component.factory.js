const { FactoryContainer } = require('./factory.container.js');

const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    let factoryContainer = new FactoryContainer();
    
    const component = new Component({packageJson});
    factoryContainer.add(component);
    return factoryContainer;
}
module.exports = { createComponent };
