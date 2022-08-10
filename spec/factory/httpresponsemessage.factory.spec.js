const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {data,userId,metadata,messageStatusCode,Id,senderHost,senderPort,recipientHost,recipientPort,token} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const {httpResponseMessage} = createHttpResponseMessage({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    // Assert
    expect(httpResponseMessage).not.toBeNull();
  });
});
