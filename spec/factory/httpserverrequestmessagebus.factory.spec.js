const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
describe('when asking the HttpServerRequestMessageBus factory to create an instance of HttpServerRequestMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null,
    "scopeId": null
};

    // Act
    const {httpServerRequestMessageBus} = createHttpServerRequestMessageBus(testInputArgs);

    // Assert
    expect(httpServerRequestMessageBus).not.toBeNull();

  });
});
