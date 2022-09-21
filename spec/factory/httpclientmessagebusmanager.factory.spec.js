const { createHttpClientMessageBusManager } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.js');
describe('when asking the HttpClientMessageBusManager factory to create an instance of HttpClientMessageBusManager', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null
};

    // Act
    const {httpClientMessageBusManager} = createHttpClientMessageBusManager(testInputArgs);

    // Assert
    expect(httpClientMessageBusManager).not.toBeNull();

  });
});
