const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
describe('when asking the HttpClientResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientResponseMessageQueueBinding} = createHttpClientResponseMessageQueueBinding(scopeId);
    // Assert
    expect(httpClientResponseMessageQueueBinding).not.toBeNull();
  });
});
