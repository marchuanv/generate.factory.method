const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
describe('when asking the HttpServerRequestMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "Test"
}

    // Act
    const {httpServerRequestMessageBus} = createHttpServerRequestMessageBus(testInputArgs);
    // Assert
    expect(httpServerRequestMessageBus).not.toBeNull();
  });
});
