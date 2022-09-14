const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
describe('when asking the HttpServerRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpServerRequestMessageQueueBinding} = createHttpServerRequestMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpServerRequestMessageQueueBinding).not.toBeNull();
  });
});
