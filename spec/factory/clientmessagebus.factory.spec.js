const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
describe('when asking the ClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "clientRequestMessageBus": null,
    "clientResponseMessageBus": null
}
    // Act
    const {clientMessageBus} = createClientMessageBus(scopeId,clientRequestMessageBus,clientResponseMessageBus);
    // Assert
    expect(clientMessageBus).not.toBeNull();
  });
});
