const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
describe('when asking the HttpClientRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientRequestMessageQueueBinding} = createHttpClientRequestMessageQueueBinding(scopeId);
    // Assert
    expect(httpClientRequestMessageQueueBinding).not.toBeNull();
  });
});
