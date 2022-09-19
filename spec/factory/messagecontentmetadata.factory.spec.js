const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance of MessageContentMetadata', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "data": null,
    "factoryContainerBindingName": null
};

    // Act
    const {messageContentMetadata} = createMessageContentMetadata(testInputArgs);

    // Assert
    expect(messageContentMetadata).not.toBeNull();

  });
});
