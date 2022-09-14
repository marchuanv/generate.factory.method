const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
describe('when asking the HttpClientStartMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {httpClientStartMessageQueueBinding} = createHttpClientStartMessageQueueBinding(scopeId);
    // Assert
    expect(httpClientStartMessageQueueBinding).not.toBeNull();
  });
});
