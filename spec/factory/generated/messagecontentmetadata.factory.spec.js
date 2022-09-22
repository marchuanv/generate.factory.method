const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\generated\\messagecontentmetadata\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance of MessageContentMetadata', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec",
    "data": null
};

    // Act
    const {messageContentMetadata} = createMessageContentMetadata(testInputArgs);

    // Assert
    expect(messageContentMetadata).not.toBeNull();

  });
});
