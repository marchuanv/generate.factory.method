const { createMessageQueue } = require('C:\\component\\lib\\factory\\generated\\messagequeue\\messagequeue.factory.js');
describe('when asking the MessageQueue factory to create an instance of MessageQueue', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {messageQueue} = createMessageQueue(testInputArgs);

    // Assert
    expect(messageQueue).not.toBeNull();

  });
});
