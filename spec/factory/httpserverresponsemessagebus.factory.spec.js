const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
describe('when asking the HttpServerResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpServerResponseMessageBus} = createHttpServerResponseMessageBus(scopeId);
    // Assert
    expect(httpServerResponseMessageBus).not.toBeNull();
  });
});
