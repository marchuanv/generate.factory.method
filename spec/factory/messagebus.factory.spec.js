const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking the MessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,channelName,senderHost,senderPort,data,token,messageStatusCode,metadata,recipientHost,recipientPort} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

    // Act
    const {messageBus} = createMessageBus({userId,senderHost,senderPort,recipientHost,recipientPort,data,token,metadata,messageStatusCode,channelName});
    // Assert
    expect(messageBus).not.toBeNull();
  });
});
