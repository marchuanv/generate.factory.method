const { FactoryContainer } = require('./factory.container.js');

const { SharedMessageQueues } = require('C:\\component\\lib\\sharedmessagequeues.js');
function createSharedMessageQueues({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    
    const sharedMessageQueues = new SharedMessageQueues(factoryContainer);
    factoryContainer.add({sharedMessageQueues});
    return factoryContainer;
}
module.exports = { createSharedMessageQueues };
