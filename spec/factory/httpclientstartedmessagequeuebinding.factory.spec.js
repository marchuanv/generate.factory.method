const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStartedMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpclientstartedmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpClientStartedMessageQueueBinding} = createHttpClientStartedMessageQueueBinding({scopeId});
    // Assert
    expect(httpClientStartedMessageQueueBinding).not.toBeNull();
  });
});
