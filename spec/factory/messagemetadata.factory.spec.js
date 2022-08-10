const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
describe('when asking the MessageMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,metadata,recipientHost,recipientPort,senderHost,senderPort} = require('C:\\component\\spec\\factory\\messagemetadata.factory.spec.variables.json');

    // Act
    const {messageMetadata} = createMessageMetadata({recipientHost,recipientPort,metadata,userId,senderHost,senderPort});
    // Assert
    expect(messageMetadata).not.toBeNull();
  });
});
