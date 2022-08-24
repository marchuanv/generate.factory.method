const { createHttpClientMessageBusManager } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.js');
describe('when asking the HttpClientMessageBusManager factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpclientmessagebusmanager.factory.spec.variables.json');

    // Act
    const {httpClientMessageBusManager} = createHttpClientMessageBusManager({scopeId});
    // Assert
    expect(httpClientMessageBusManager).not.toBeNull();
  });
});
