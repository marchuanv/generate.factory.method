const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
describe('when asking the HttpServerResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpserverresponsemessagebus.factory.spec.variables.json');

    // Act
    const {httpServerResponseMessageBus} = createHttpServerResponseMessageBus({scopeId,messageQueue});
    // Assert
    expect(httpServerResponseMessageBus).not.toBeNull();
  });
});
