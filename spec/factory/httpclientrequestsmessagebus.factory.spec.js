const { createHttpClientRequestsMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestsmessagebus.factory.js');
describe('when asking the HttpClientRequestsMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpclientrequestsmessagebus.factory.spec.variables.json');

    // Act
    const {httpClientRequestsMessageBus} = createHttpClientRequestsMessageBus({scopeId});
    // Assert
    expect(httpClientRequestsMessageBus).not.toBeNull();
  });
});
