const { createHttpClientMessageBusManager } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.js');
describe('when asking the HttpClientMessageBusManager factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding} = require('C:\\component\\spec\\factory\\httpclientmessagebusmanager.factory.spec.variables.json');

    // Act
    const {httpClientMessageBusManager} = createHttpClientMessageBusManager({scopeId,httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding});
    // Assert
    expect(httpClientMessageBusManager).not.toBeNull();
  });
});
