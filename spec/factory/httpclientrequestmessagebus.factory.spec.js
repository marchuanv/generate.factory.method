const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
describe('when asking the HttpClientRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpClientRequestMessageBus} = createHttpClientRequestMessageBus(testInputArgs);
    // Assert
    expect(httpClientRequestMessageBus).not.toBeNull();
  });
});
