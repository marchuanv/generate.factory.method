const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
describe('when asking the HttpServerRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\httpserverrequestmessagebus.factory.spec.variables.json');

    // Act
    const {httpServerRequestMessageBus} = createHttpServerRequestMessageBus({scopeId});
    // Assert
    expect(httpServerRequestMessageBus).not.toBeNull();
  });
});
