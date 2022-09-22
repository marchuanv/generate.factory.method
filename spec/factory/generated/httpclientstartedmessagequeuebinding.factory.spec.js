const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpclientstartedmessagequeuebinding\\httpclientstartedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStartedMessageQueueBinding factory to create an instance of HttpClientStartedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientStartedMessageQueueBinding} = createHttpClientStartedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStartedMessageQueueBinding).not.toBeNull();

  });
});
