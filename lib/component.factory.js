const { Component } = require('C:\\component\\lib\\component.js'); 
function ComponentFactory({ packageJson }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Component({ packageJson });
    }});
} 
module.exports = { ComponentFactory }; 
