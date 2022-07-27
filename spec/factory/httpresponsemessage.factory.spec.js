const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {data,metadata,messageStatusCode,Id,senderHost,senderPort,recipientHost,recipientPort} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const {httpResponseMessage} = createHttpResponseMessage({recipientHost,recipientPort,Id,data,metadata,messageStatusCode,senderHost,senderPort});
    // Assert
    expect(httpResponseMessage).not.toBeNull();
  });
});
