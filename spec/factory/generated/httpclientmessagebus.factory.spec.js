const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\generated\\httpclientmessagebus\\httpclientmessagebus.factory.js');
describe('when asking the HttpClientMessageBus factory to create an instance of HttpClientMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "timeout": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientMessageBus} = createHttpClientMessageBus(testInputArgs);

    // Assert
    expect(httpClientMessageBus).not.toBeNull();

  });
});
