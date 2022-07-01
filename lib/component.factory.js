const { Component } = require('C:\\component\\lib\\component.js'); 
function ComponentFactory({ packageJson }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Component({ packageJson });
    }});
} 
module.exports = { ComponentFactory }; 
