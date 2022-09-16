const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
describe('when asking the HttpClientResponseMessageQueueBinding factory to create an instance of HttpClientResponseMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpClientResponseMessageQueueBinding} = createHttpClientResponseMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpClientResponseMessageQueueBinding).not.toBeNull();

  });
});
