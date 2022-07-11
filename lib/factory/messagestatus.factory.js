const { FactoryContainer } = require('./factory.container.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    
    const messageStatus = new MessageStatus({messageStatusCode});
    factoryContainer.add(messageStatus);
    return factoryContainer;
}
module.exports = { createMessageStatus };
