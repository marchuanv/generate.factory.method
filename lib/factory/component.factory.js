const { FactoryContainer } = require('./factory.container.js');

const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    let container = new FactoryContainer();
    container.add({packageJson});
    
    const component = new Component(container);
    container.add({component});
    return container;
}
module.exports = { createComponent };
