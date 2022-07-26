const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking the HttpRequestMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {method,userId,data,path,senderHost,senderPort,metadata,recipientHost,recipientPort,messageStatusCode,Id} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

    // Act
    const {httpRequestMessage} = createHttpRequestMessage({method,recipientHost,recipientPort,Id,data,userId,metadata,messageStatusCode,senderHost,senderPort,path});
    // Assert
    expect(httpRequestMessage).not.toBeNull();
  });
});
