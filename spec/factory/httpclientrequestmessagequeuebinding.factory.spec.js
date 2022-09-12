const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
describe('when asking the HttpClientRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpclientrequestmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpClientRequestMessageQueueBinding} = createHttpClientRequestMessageQueueBinding({scopeId,messageQueue});
    // Assert
    expect(httpClientRequestMessageQueueBinding).not.toBeNull();
  });
});
