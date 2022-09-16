const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
describe('when asking the HttpServerStopMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpServerStopMessageQueueBinding} = createHttpServerStopMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpServerStopMessageQueueBinding).not.toBeNull();
  });
});
