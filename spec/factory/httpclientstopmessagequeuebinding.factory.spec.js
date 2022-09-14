const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
describe('when asking the HttpClientStopMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpClientStopMessageQueueBinding} = createHttpClientStopMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpClientStopMessageQueueBinding).not.toBeNull();
  });
});
