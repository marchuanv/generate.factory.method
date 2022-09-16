const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
describe('when asking the MessageStatus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "messageStatusCode": null
}

    // Act
    const {messageStatus} = createMessageStatus(testInputArgs);
    // Assert
    expect(messageStatus).not.toBeNull();
  });
});
