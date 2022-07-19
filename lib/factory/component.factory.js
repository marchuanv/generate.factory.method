const factory = require('./factory.js');

const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    let container = factory.createContainer(Component);
    container.add({packageJson});
    
    const component = new Component(container);
    container.add({component});
    return container;
}
module.exports = { createComponent };
