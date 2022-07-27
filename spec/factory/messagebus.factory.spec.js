const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking the MessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {senderHost,senderPort,recipientHost,recipientPort,messageQueueTypeCode,channel,remoteBase64RSAPublicKey,userId} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

    // Act
    const {messageBus} = createMessageBus({remoteBase64RSAPublicKey,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId});
    // Assert
    expect(messageBus).not.toBeNull();
  });
});
