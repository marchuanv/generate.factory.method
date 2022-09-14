const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
describe('when asking the HttpClientResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientResponseMessageBus} = createHttpClientResponseMessageBus(scopeId);
    // Assert
    expect(httpClientResponseMessageBus).not.toBeNull();
  });
});
