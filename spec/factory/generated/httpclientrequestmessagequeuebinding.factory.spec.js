const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\generated\\httpclientrequestmessagequeuebinding\\httpclientrequestmessagequeuebinding.factory.js');
describe('when asking the HttpClientRequestMessageQueueBinding factory to create an instance of HttpClientRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientRequestMessageQueueBinding} = createHttpClientRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientRequestMessageQueueBinding).not.toBeNull();

  });
});
