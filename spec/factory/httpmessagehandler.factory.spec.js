const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
describe('when asking the HttpMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,senderHost,senderPort,recipientHost,recipientPort} = require('C:\\component\\spec\\factory\\httpmessagehandler.factory.spec.variables.json');

    // Act
    const {httpMessageHandler} = createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort});
    // Assert
    expect(httpMessageHandler).not.toBeNull();
  });
});
