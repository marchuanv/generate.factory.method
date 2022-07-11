
const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {
    
    const component = new Component({packageJson});
    return {component};
}
module.exports = { createComponent };
