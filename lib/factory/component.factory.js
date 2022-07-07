
const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    
    const component = new Component({packageJson});
    console.log('ComponentFactory: --> created Component');
    return {component};
}
module.exports = { createComponent };
