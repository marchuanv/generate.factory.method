const { createHttpMessageBus } = require('C:\\component\\lib\\factory\\httpmessagebus.factory.js');
describe('when asking the HttpMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,senderHost,senderPort,messageQueueContextId} = require('C:\\component\\spec\\factory\\httpmessagebus.factory.spec.variables.json');

    // Act
    const {httpMessageBus} = createHttpMessageBus({messageQueueContextId,senderHost,senderPort,timeout});
    // Assert
    expect(httpMessageBus).not.toBeNull();
  });
});
