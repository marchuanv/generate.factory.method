const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "data": null
}

    // Act
    const {messageContentMetadata} = createMessageContentMetadata(testInputArgs);
    // Assert
    expect(messageContentMetadata).not.toBeNull();
  });
});
