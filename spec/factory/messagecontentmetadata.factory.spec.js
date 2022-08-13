const { createMessageContentMetadata } = require('D:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {data} = require('D:\\component\\spec\\factory\\messagecontentmetadata.factory.spec.variables.json');

    // Act
    const {messageContentMetadata} = createMessageContentMetadata({data});
    // Assert
    expect(messageContentMetadata).not.toBeNull();
  });
});
