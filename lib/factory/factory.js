const utils = require("utils");
const { FactoryContainer } = require('./factory.container.js');
function Factory() {
    const containers = [];
    Object.defineProperty(this, 'createContainer', { configurable: false, writable: false, value: (type) => {
        const container = new FactoryContainer();
        containers.push({ type, container });
        return container;
    }});
}
Factory.prototype.createContainer = function(type) {};
module.exports = new Factory();
