const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
describe('when asking the HttpClientResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpClientResponseMessageBus} = createHttpClientResponseMessageBus(testInputArgs);
    // Assert
    expect(httpClientResponseMessageBus).not.toBeNull();
  });
});
