const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');
describe('when asking the ClientMessageBus factory to create an instance of ClientMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "clientRequestMessageBus": null,
    "clientResponseMessageBus": null
};

    // Act
    const {clientMessageBus} = createClientMessageBus(testInputArgs);

    // Assert
    expect(clientMessageBus).not.toBeNull();

  });
});
