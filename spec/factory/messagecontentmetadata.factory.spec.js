const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');
describe('when asking the MessageContentMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {senderHost,senderPort,data,token,metadata} = require('C:\\component\\spec\\factory\\messagecontentmetadata.factory.spec.variables.json');

    // Act
    const {messageContentMetadata} = createMessageContentMetadata({data,senderHost,senderPort,token,metadata});
    // Assert
    expect(messageContentMetadata).not.toBeNull();
  });
});
