const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
describe('when asking the HttpClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "timeout": null
}
    // Act
    const {httpClientMessageBus} = createHttpClientMessageBus(scopeId,timeout);
    // Assert
    expect(httpClientMessageBus).not.toBeNull();
  });
});
