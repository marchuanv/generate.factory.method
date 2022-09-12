const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStoppedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpclientstoppedmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpClientStoppedMessageQueueBinding} = createHttpClientStoppedMessageQueueBinding({scopeId,messageQueue});
    // Assert
    expect(httpClientStoppedMessageQueueBinding).not.toBeNull();
  });
});
