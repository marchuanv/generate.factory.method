const { FactoryContainer } = require('./factory.container.js');

const { HostAddress } = require('C:\\component\\lib\\hostaddress.js');
function createHostAddress({host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({host,port});
    
    const hostAddress = new HostAddress(factoryContainer);
    factoryContainer.add({hostAddress});
    return factoryContainer;
}
module.exports = { createHostAddress };
