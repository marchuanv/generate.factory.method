const { FactoryContainer } = require('./factory.container.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    let container = new FactoryContainer();
    container.add({messageStatusCode});
    
    const messageStatus = new MessageStatus(container);
    container.add({messageStatus});
    return container;
}
module.exports = { createMessageStatus };
