const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
describe('when asking the HttpClientStopMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpclientstopmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpClientStopMessageQueueBinding} = createHttpClientStopMessageQueueBinding({scopeId});
    // Assert
    expect(httpClientStopMessageQueueBinding).not.toBeNull();
  });
});
