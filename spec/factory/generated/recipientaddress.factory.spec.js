const { createRecipientAddress } = require('C:\\component\\lib\\factory\\generated\\recipientaddress\\recipientaddress.factory.js');
describe('when asking the RecipientAddress factory to create an instance of RecipientAddress', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "recipientHost": null,
    "recipientPort": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {recipientAddress} = createRecipientAddress(testInputArgs);

    // Assert
    expect(recipientAddress).not.toBeNull();

  });
});
