const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpclientstoppedmessagequeuebinding\\httpclientstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStoppedMessageQueueBinding factory to create an instance of HttpClientStoppedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientStoppedMessageQueueBinding} = createHttpClientStoppedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStoppedMessageQueueBinding).not.toBeNull();

  });
});
