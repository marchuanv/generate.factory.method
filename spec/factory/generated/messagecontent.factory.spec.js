const { createMessageContent } = require('C:\\component\\lib\\factory\\generated\\messagecontent\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance of MessageContent', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec",
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
};

    // Act
    const {messageContent} = createMessageContent(testInputArgs);

    // Assert
    expect(messageContent).not.toBeNull();

  });
});
