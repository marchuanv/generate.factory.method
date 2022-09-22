const { createMessageStore } = require('C:\\component\\lib\\factory\\generated\\messagestore\\messagestore.factory.js');
describe('when asking the MessageStore factory to create an instance of MessageStore', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {messageStore} = createMessageStore(testInputArgs);

    // Assert
    expect(messageStore).not.toBeNull();

  });
});
