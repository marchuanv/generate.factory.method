const { FactoryContainer } = require('./factory.container.js');

const { HostAddress } = require('C:\\component\\lib\\hostaddress.js');
function createHostAddress({host,hostPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,hostPort});
    
    const hostAddress = new HostAddress(factoryContainer);
    factoryContainer.add({hostAddress});
    return factoryContainer;
}
module.exports = { createHostAddress };
