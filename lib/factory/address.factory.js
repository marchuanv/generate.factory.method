const { FactoryContainer } = require('./factory.container.js');

const { Address } = require('C:\\component\\lib\\address.js');
function createAddress({host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port});
    
    const address = new Address(factoryContainer);
    factoryContainer.add({address});
    return factoryContainer;
}
module.exports = { createAddress };
