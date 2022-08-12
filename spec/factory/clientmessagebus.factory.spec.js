const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
describe('when asking the ClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,timeout,httpClientMessageBus} = require('C:\\component\\spec\\factory\\clientmessagebus.factory.spec.variables.json');

    // Act
    const {clientMessageBus} = createClientMessageBus({contextId,timeout});
    // Assert
    expect(clientMessageBus).not.toBeNull();
  });
});
