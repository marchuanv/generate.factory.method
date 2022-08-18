const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
describe('when asking the MessageStatus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageStatusCode} = require('C:\\component\\spec\\factory\\messagestatus.factory.spec.variables.json');

    // Act
    const {messageStatus} = createMessageStatus({scopeId,messageStatusCode});
    // Assert
    expect(messageStatus).not.toBeNull();
  });
});
