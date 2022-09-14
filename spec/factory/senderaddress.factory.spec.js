const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
describe('when asking the SenderAddress factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "senderHost": null,
    "senderPort": null
}
    // Act
    const {senderAddress} = createSenderAddress(scopeId,senderHost,senderPort);
    // Assert
    expect(senderAddress).not.toBeNull();
  });
});
