const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {senderHost,senderPort,userId,data,metadata,recipientHost,recipientPort,messageStatusCode,Id} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const {httpResponseMessage} = createHttpResponseMessage({recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort});
    // Assert
    expect(httpResponseMessage).not.toBeNull();
  });
});
