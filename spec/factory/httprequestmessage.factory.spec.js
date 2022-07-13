const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking the HttpRequestMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {method,userId,data,token,messageStatusCode,path,senderHost,senderPort} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

    // Act
    const {httpRequestMessage} = createHttpRequestMessage({method,senderHost,senderPort,userId,data,token,messageStatusCode,path});
    // Assert
    expect(httpRequestMessage).not.toBeNull();
  });
});
