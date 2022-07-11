const { FactoryContainer } = require('./factory.container.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({messageStatusCode});
    
    const messageStatus = new MessageStatus(factoryContainer);
    factoryContainer.add({messageStatus});
    return factoryContainer;
}
module.exports = { createMessageStatus };
