const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
}
    // Act
    const {messageContent} = createMessageContent(scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort);
    // Assert
    expect(messageContent).not.toBeNull();
  });
});
