const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
describe('when asking the HttpClientStartMessageQueueBinding factory to create an instance of HttpClientStartMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpClientStartMessageQueueBinding} = createHttpClientStartMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientStartMessageQueueBinding).not.toBeNull();

  });
});
