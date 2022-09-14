const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
describe('when asking the ServerMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "serverResponseMessageBus": null,
    "serverRequestMessageBus": null
}
    // Act
    const {serverMessageBus} = createServerMessageBus(scopeId,serverResponseMessageBus,serverRequestMessageBus);
    // Assert
    expect(serverMessageBus).not.toBeNull();
  });
});
