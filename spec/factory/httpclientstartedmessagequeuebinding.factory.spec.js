const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
describe('when asking the HttpClientStartedMessageQueueBinding factory to create an instance of HttpClientStartedMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpClientStartedMessageQueueBinding} = createHttpClientStartedMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStartedMessageQueueBinding).not.toBeNull();

  });
});
