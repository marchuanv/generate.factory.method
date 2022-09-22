const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\generated\\httpclientresponsemessagebus\\httpclientresponsemessagebus.factory.js');
describe('when asking the HttpClientResponseMessageBus factory to create an instance of HttpClientResponseMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {httpClientResponseMessageBus} = createHttpClientResponseMessageBus(testInputArgs);

    // Assert
    expect(httpClientResponseMessageBus).not.toBeNull();

  });
});
