const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
describe('when asking the MessageMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
}
    // Act
    const {messageMetadata} = createMessageMetadata(scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort);
    // Assert
    expect(messageMetadata).not.toBeNull();
  });
});
