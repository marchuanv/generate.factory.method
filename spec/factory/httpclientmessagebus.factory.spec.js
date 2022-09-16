const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
describe('when asking the HttpClientMessageBus factory to create an instance of HttpClientMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "timeout": null
};

    // Act
    const {httpClientMessageBus} = createHttpClientMessageBus(testInputArgs);

    // Assert
    expect(httpClientMessageBus).not.toBeNull();

  });
});
