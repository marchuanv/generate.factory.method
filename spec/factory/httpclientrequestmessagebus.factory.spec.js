const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
describe('when asking the HttpClientRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpclientrequestmessagebus.factory.spec.variables.json');

    // Act
    const {httpClientRequestMessageBus} = createHttpClientRequestMessageBus({scopeId});
    // Assert
    expect(httpClientRequestMessageBus).not.toBeNull();
  });
});
