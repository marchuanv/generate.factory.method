const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpserverrequestmessagequeuebinding\\httpserverrequestmessagequeuebinding.factory.js');
describe('when asking the HttpServerRequestMessageQueueBinding factory to create an instance of HttpServerRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpServerRequestMessageQueueBinding} = createHttpServerRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerRequestMessageQueueBinding).not.toBeNull();

  });
});
