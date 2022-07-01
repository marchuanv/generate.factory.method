const utils = require('utils');
const { Component } = require('C:\\component\\lib\\component.js');
function ComponentFactory({ packageJson }) {
    utils.createProperty(this, 'create', () => {
        return new Component({ packageJson });
    });
}
module.exports = { ComponentFactory };
