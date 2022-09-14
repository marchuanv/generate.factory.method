const { createHttpClientMessageBusManager } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.js');
describe('when asking the HttpClientMessageBusManager factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientMessageBusManager} = createHttpClientMessageBusManager(scopeId);
    // Assert
    expect(httpClientMessageBusManager).not.toBeNull();
  });
});
