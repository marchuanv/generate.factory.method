const factory = require('./factory.js');

const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {remoteBase64RSAPublicKey,messageHandlerQueue,senderAddress,recipientAddress,channel,userId}
*/
function createMessageBus({remoteBase64RSAPublicKey,messageHandlerQueue,senderAddress,recipientAddress,channel,userId}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({remoteBase64RSAPublicKey,messageHandlerQueue,senderAddress,recipientAddress,channel,userId});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
