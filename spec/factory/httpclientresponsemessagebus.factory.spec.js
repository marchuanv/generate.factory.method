const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
describe('when asking the HttpClientResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpclientresponsemessagebus.factory.spec.variables.json');

    // Act
    const {httpClientResponseMessageBus} = createHttpClientResponseMessageBus({scopeId});
    // Assert
    expect(httpClientResponseMessageBus).not.toBeNull();
  });
});
