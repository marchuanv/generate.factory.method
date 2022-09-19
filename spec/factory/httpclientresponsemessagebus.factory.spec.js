const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
describe('when asking the HttpClientResponseMessageBus factory to create an instance of HttpClientResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null,
    "factoryContainerBindingName": null
};

    // Act
    const {httpClientResponseMessageBus} = createHttpClientResponseMessageBus(testInputArgs);

    // Assert
    expect(httpClientResponseMessageBus).not.toBeNull();

  });
});
