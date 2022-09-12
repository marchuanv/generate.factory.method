const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
describe('when asking the HttpClientResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpclientresponsemessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpClientResponseMessageQueueBinding} = createHttpClientResponseMessageQueueBinding({scopeId,messageQueue});
    // Assert
    expect(httpClientResponseMessageQueueBinding).not.toBeNull();
  });
});
