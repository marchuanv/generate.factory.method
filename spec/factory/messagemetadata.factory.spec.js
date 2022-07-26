const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');
describe('when asking the MessageMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {metadata} = require('C:\\component\\spec\\factory\\messagemetadata.factory.spec.variables.json');

    // Act
    const {messageMetadata} = createMessageMetadata({metadata});
    // Assert
    expect(messageMetadata).not.toBeNull();
  });
});