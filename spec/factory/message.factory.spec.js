const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {Id,recipientHost,recipientPort,senderHost,senderPort,data,messageStatusCode,userId,metadata} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const {message} = createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,userId,senderHost,senderPort});
    // Assert
    expect(message).not.toBeNull();
  });
});
