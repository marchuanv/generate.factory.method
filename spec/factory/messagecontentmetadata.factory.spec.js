const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "data": null
}
    // Act
    const {messageContentMetadata} = createMessageContentMetadata(scopeId,data);
    // Assert
    expect(messageContentMetadata).not.toBeNull();
  });
});
