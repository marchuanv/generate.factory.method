const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {data,userId,metadata,recipientHost,recipientPort,senderHost,senderPort,token,sharedUserSessions,messageMetadata} = require('C:\\component\\spec\\factory\\messagecontent.factory.spec.variables.json');

    // Act
    const {messageContent} = createMessageContent({data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    // Assert
    expect(messageContent).not.toBeNull();
  });
});
