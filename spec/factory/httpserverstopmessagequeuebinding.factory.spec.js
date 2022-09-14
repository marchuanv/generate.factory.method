const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
describe('when asking the HttpServerStopMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpServerStopMessageQueueBinding} = createHttpServerStopMessageQueueBinding(scopeId);
    // Assert
    expect(httpServerStopMessageQueueBinding).not.toBeNull();
  });
});
