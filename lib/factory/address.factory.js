const { FactoryContainer } = require('./factory.container.js');

const { Address } = require('C:\\component\\lib\\address.js');
function createAddress({host,port}) {
    let factoryContainer = new FactoryContainer();
    
    const address = new Address({host,port});
    factoryContainer.add(address);
    return factoryContainer;
}
module.exports = { createAddress };
