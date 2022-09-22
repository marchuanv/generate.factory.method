const { createMessage } = require('C:\\component\\lib\\factory\\generated\\message\\message.factory.js');
describe('when asking the Message factory to create an instance of Message', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "messageStatusCode": null,
    "factoryContainerBindingName": "factoryspec",
    "Id": null,
    "data": null,
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null
};

    // Act
    const {message} = createMessage(testInputArgs);

    // Assert
    expect(message).not.toBeNull();

  });
});
