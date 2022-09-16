const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStoppedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpClientStoppedMessageQueueBinding} = createHttpClientStoppedMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpClientStoppedMessageQueueBinding).not.toBeNull();
  });
});
