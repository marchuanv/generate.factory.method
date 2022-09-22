const { createMessageMetadata } = require('C:\\component\\lib\\factory\\generated\\messagemetadata\\messagemetadata.factory.js');
describe('when asking the MessageMetadata factory to create an instance of MessageMetadata', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "recipientHost": null,
    "recipientPort": null,
    "metadata": null,
    "token": null,
    "senderHost": null,
    "senderPort": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {messageMetadata} = createMessageMetadata(testInputArgs);

    // Assert
    expect(messageMetadata).not.toBeNull();

  });
});
