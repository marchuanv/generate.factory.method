const factory = require('./factory.js');

const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js');
function createMessageStatus({messageStatusCode}) {
    let container = factory.createContainer(MessageStatus);
    container.add({messageStatusCode});
    
    const messageStatus = new MessageStatus(container);
    container.add({messageStatus});
    return container;
}
module.exports = { createMessageStatus };
