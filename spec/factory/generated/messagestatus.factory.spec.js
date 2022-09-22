const { createMessageStatus } = require('C:\\component\\lib\\factory\\generated\\messagestatus\\messagestatus.factory.js');
describe('when asking the MessageStatus factory to create an instance of MessageStatus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "messageStatusCode": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {messageStatus} = createMessageStatus(testInputArgs);

    // Assert
    expect(messageStatus).not.toBeNull();

  });
});
