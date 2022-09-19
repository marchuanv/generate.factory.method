const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
describe('when asking the MessageConverter factory to create an instance of MessageConverter', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null
};

    // Act
    const {messageConverter} = createMessageConverter(testInputArgs);

    // Assert
    expect(messageConverter).not.toBeNull();

  });
});
