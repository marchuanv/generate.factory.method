const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.prototype.factory.js');
describe('when asking the ClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageConverter,httpClientRequestMessageBus,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus} = require('C:\\component\\spec\\factory\\clientmessagebus.prototype.factory.spec.variables.json');

    // Act
    const {clientMessageBus} = createClientMessageBus({scopeId});
    // Assert
    expect(clientMessageBus).not.toBeNull();
  });
});
