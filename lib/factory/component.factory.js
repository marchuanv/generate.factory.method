const { Component } = require('C:\\component\\lib\\component.js');
function createComponent({packageJson}) {

    return new Component({packageJson});
}
module.exports = { createComponent };
