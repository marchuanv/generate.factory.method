const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {senderHost,senderPort,userId,data,messageStatusCode,metadata,recipientHost,recipientPort,Id} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const {message} = createMessage({recipientHost,recipientPort,Id,userId,data,metadata,messageStatusCode,senderHost,senderPort});
    // Assert
    expect(message).not.toBeNull();
  });
});
