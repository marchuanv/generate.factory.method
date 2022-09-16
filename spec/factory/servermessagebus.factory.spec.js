const { createServerMessageBus } = require('C:\\component\\lib\\factory\\servermessagebus.factory.js');
describe('when asking the ServerMessageBus factory to create an instance of ServerMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "serverResponseMessageBus": null,
    "serverRequestMessageBus": null
};

    // Act
    const {serverMessageBus} = createServerMessageBus(testInputArgs);

    // Assert
    expect(serverMessageBus).not.toBeNull();

  });
});
