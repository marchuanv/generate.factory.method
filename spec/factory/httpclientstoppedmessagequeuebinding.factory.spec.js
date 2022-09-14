const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStoppedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientStoppedMessageQueueBinding} = createHttpClientStoppedMessageQueueBinding(scopeId);
    // Assert
    expect(httpClientStoppedMessageQueueBinding).not.toBeNull();
  });
});
