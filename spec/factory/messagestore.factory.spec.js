const { createMessageStore } = require('C:\\component\\lib\\factory\\messagestore.factory.js');
describe('when asking the MessageStore factory to create an instance of MessageStore', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null
};

    // Act
    const {messageStore} = createMessageStore(testInputArgs);

    // Assert
    expect(messageStore).not.toBeNull();

  });
});
