const { createServerMessageBus } = require('C:\\component\\lib\\factory\\generated\\servermessagebus\\servermessagebus.factory.js');
describe('when asking the ServerMessageBus factory to create an instance of ServerMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "serverResponseMessageBus": null,
    "serverRequestMessageBus": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {serverMessageBus} = createServerMessageBus(testInputArgs);

    // Assert
    expect(serverMessageBus).not.toBeNull();

  });
});
