const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
describe('when asking the RecipientAddress factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "recipientHost": null,
    "recipientPort": null
}

    // Act
    const {recipientAddress} = createRecipientAddress(testInputArgs);
    // Assert
    expect(recipientAddress).not.toBeNull();
  });
});
