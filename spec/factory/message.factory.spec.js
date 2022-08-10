const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {Id,recipientHost,recipientPort,senderHost,senderPort,data,messageStatusCode,userId,metadata,token,messageStatus,messageContent,messageContentMetadata,messageMetadata,sharedUserSessions} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const {message} = createMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    // Assert
    expect(message).not.toBeNull();
  });
});
