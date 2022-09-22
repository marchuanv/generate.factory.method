const { createSenderAddress } = require('C:\\component\\lib\\factory\\generated\\senderaddress\\senderaddress.factory.js');
describe('when asking the SenderAddress factory to create an instance of SenderAddress', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "senderHost": null,
    "senderPort": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {senderAddress} = createSenderAddress(testInputArgs);

    // Assert
    expect(senderAddress).not.toBeNull();

  });
});
