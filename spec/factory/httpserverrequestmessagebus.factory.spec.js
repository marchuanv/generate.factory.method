const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
describe('when asking the HttpServerRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpServerRequestMessageBus} = createHttpServerRequestMessageBus(scopeId);
    // Assert
    expect(httpServerRequestMessageBus).not.toBeNull();
  });
});
