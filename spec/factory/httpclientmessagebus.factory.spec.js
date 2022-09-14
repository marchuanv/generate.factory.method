const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
describe('when asking the HttpClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,scopeId,blabal} = require('C:\\component\\spec\\factory\\httpclientmessagebus.factory.spec.variables.json');

    // Act
    const {httpClientMessageBus} = createHttpClientMessageBus({scopeId,timeout});
    // Assert
    expect(httpClientMessageBus).not.toBeNull();
  });
});
