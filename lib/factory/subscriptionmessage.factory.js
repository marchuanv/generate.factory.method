const factory = require('./factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { SubscriptionMessage } = require('C:\\component\\lib\\subscriptionmessage.js');
function createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}) {
    const container = factory.createContainer({ type: SubscriptionMessage, variableName:'subscriptionMessage' });
    container.config({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName});
    container.config(createMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode}));
    container.complete();
    return container;
}
module.exports = { createSubscriptionMessage };
