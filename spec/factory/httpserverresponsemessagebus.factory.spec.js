const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
describe('when asking the HttpServerResponseMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpServerResponseMessageBus} = createHttpServerResponseMessageBus(testInputArgs);
    // Assert
    expect(httpServerResponseMessageBus).not.toBeNull();
  });
});
