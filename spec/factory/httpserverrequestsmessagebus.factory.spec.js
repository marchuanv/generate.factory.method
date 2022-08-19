const { createHttpServerRequestsMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestsmessagebus.factory.js');
describe('when asking the HttpServerRequestsMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpserverrequestsmessagebus.factory.spec.variables.json');

    // Act
    const {httpServerRequestsMessageBus} = createHttpServerRequestsMessageBus({scopeId});
    // Assert
    expect(httpServerRequestsMessageBus).not.toBeNull();
  });
});
