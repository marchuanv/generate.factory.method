const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance of MessageContent', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null,
    "factoryContainerBindingName": null
};

    // Act
    const {messageContent} = createMessageContent(testInputArgs);

    // Assert
    expect(messageContent).not.toBeNull();

  });
});
