const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpclientstopmessagequeuebinding\\httpclientstopmessagequeuebinding.factory.js');
describe('when asking the HttpClientStopMessageQueueBinding factory to create an instance of HttpClientStopMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientStopMessageQueueBinding} = createHttpClientStopMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStopMessageQueueBinding).not.toBeNull();

  });
});
