const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
describe('when asking the SenderAddress factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port} = require('C:\\component\\spec\\factory\\senderaddress.factory.spec.variables.json');

    // Act
    const {senderAddress} = createSenderAddress({host,port});
    // Assert
    expect(senderAddress).not.toBeNull();
  });
});
