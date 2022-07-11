const { FactoryContainer } = require('./factory.container.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { Message } = require('C:\\component\\lib\\message.js');
function createMessage({userId,data,metadata,messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createMessageStatus({messageStatusCode}));
factoryContainer.add(createContent({userId,data,metadata}));
    const message = new Message({content,messageStatus});
    factoryContainer.add(message);
    return factoryContainer;
}
module.exports = { createMessage };
