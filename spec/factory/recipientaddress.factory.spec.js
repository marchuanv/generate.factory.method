const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
describe('when asking the RecipientAddress factory to create an instance of RecipientAddress', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "recipientHost": null,
    "recipientPort": null,
    "factoryContainerBindingName": null
};

    // Act
    const {recipientAddress} = createRecipientAddress(testInputArgs);

    // Assert
    expect(recipientAddress).not.toBeNull();

  });
});
