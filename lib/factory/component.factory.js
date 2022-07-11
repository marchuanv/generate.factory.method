const { FactoryContainer } = require('./factory.container.js');

const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({packageJson});
    
    const component = new Component(factoryContainer);
    factoryContainer.add({component});
    return factoryContainer;
}
module.exports = { createComponent };
