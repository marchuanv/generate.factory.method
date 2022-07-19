const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { SubscriptionMessage } = require('C:\\component\\lib\\subscriptionmessage.js');
function createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}) {
    let container = new FactoryContainer();
    container.add({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName});
    container.add(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    const subscriptionMessage = new SubscriptionMessage(container);
    container.add({subscriptionMessage});
    return container;
}
module.exports = { createSubscriptionMessage };
