const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
describe('when asking the MessageMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,metadata,recipientHost,recipientPort,senderHost,senderPort,token} = require('C:\\component\\spec\\factory\\messagemetadata.factory.spec.variables.json');

    // Act
    const {messageMetadata} = createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    // Assert
    expect(messageMetadata).not.toBeNull();
  });
});
