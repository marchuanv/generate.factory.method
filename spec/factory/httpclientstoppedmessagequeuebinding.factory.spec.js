const { createHttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStoppedMessageQueueBinding factory to create an instance of HttpClientStoppedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null
};

    // Act
    const {httpClientStoppedMessageQueueBinding} = createHttpClientStoppedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStoppedMessageQueueBinding).not.toBeNull();

  });
});
