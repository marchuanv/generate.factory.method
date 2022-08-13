const { createMessageStatus } = require('D:\\component\\lib\\factory\\messagestatus.factory.js');
describe('when asking the MessageStatus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageStatusCode} = require('D:\\component\\spec\\factory\\messagestatus.factory.spec.variables.json');

    // Act
    const {messageStatus} = createMessageStatus({messageStatusCode});
    // Assert
    expect(messageStatus).not.toBeNull();
  });
});
