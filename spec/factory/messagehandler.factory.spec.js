const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
describe('when asking the MessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,senderHost,senderPort} = require('C:\\component\\spec\\factory\\messagehandler.factory.spec.variables.json');

    // Act
    const {messageHandler} = createMessageHandler({userId,senderHost,senderPort});
    // Assert
    expect(messageHandler).not.toBeNull();
  });
});
